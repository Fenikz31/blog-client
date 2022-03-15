import React, { memo, useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, Chip, FormControlLabel, Paper, Popper, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';

import EditorComponent from '../components/editor';
import Modal from '../components/modal';
import { load_articles, publish_article, save_article } from '../redux/actions/articles';
import {
  AddCircleOutlineRounded,
  CloseRounded,
  CloudUploadRounded,
  PreviewRounded,
  PublishRounded,
  SaveRounded
} from '@mui/icons-material';

export default function Blog () {
  const dispatch = useDispatch(),
        { action, articles, auth } = useSelector(( state )=> state ),
        { article, rows } = articles,
        { token } = auth.profile,
        [ columns, setColumns ] = useState([
          {
              field: 'created',
              headerName: 'Created',
              type: 'date',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          },
          {
              field: 'updated',
              headerName: 'Updated',
              type: 'date',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          },
          {
              field: 'title',
              headerName: 'Title',
              type: 'string',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          },
          {
              field: 'description',
              headerName: 'Description',
              type: 'string',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          },
          {
              field: 'published',
              headerName: 'Published',
              type: 'boolean',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          },
          {
              field: 'tags',
              headerName: 'Tags',
              type: 'string',
              flex: 1 / 8,
              sortable: false,
              renderCell: renderCellExpand
          },
          {
              field: 'author',
              headerName: 'Author',
              type: 'string',
              flex: 1 / 8,
              sortable: true,
              renderCell: renderCellExpand
          }
      ]),
        parsed = rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest })),
        [ filter, setFilter ] = useState({ items: []}),
        [ loading, setLoading ] = useState( true ),
        [ data, setData ] = useState( parsed ),
        [ preview, setPreview ] = useState( null ),
        [ pageSize, setPageSize ] = useState( 10 ),
        [ values, setValues ] = useState({
          title: '',
          description: '',
          published: false,
          tags: '',
          text: ''
        }),
        [ modal, setModal ] = useState({
          selected: null,
          title: null,
          type: null
        }),
        [ editor, setEditor ] = useState( false ),
        [ tagsArray, setTagsArray ] = useState([]);
  
  const GridCellExpand = memo(
    function GridCellExpand({ field, value, width }) {
    const wrapper = useRef( null ),
          cellDiv = useRef( null ),
          cellValue = useRef( null ),
          [ anchorEl, setAnchorEl ] = useState( null ),
          [ showFullCell, setShowFullCell ] = useState( false ),
          [ showPopper, setShowPopper ] = useState( false );
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown( cellValue.current );
      setShowPopper( isCurrentlyOverflown );
      setAnchorEl( cellDiv.current );
      setShowFullCell( true );
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    useEffect(() => {
      if ( !showFullCell ) {
        return undefined;
      }
  
      function handleKeyDown( nativeEvent ) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if ( nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc' ) {
          setShowFullCell( false );
        }
      }
  
      document.addEventListener( 'keydown', handleKeyDown );
  
      return () => {
        document.removeEventListener( 'keydown', handleKeyDown );
      };
    }, [ setShowFullCell, showFullCell ]);
    
    return (
      <Box
        ref={ wrapper }
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: 1,
          height: 1,
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={ cellDiv }
          sx={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={ cellValue }
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          { value }
        </Box>
        { showPopper && (
          <Popper
            open={ showFullCell && anchorEl !== null }
            anchorEl={ anchorEl }
            style={{ flexWrap: 'wrap', maxWidth: 700, offset: 'auto' }}
          >
            <Paper
              elevation={ 1 }
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography variant='body2' style={{ padding: 8 }}>
                { value }
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  function handleChange ( event ) {
    const { name, value } = event.target
    
    setValues({ ...values, [ name ]: value })
  }

  function handleCheck ( event ) {
    const { name, checked } = event.target
    
    setValues({ ...values, [ name ]: checked })
  }

  function handleClose ( e ) {
    setEditor( false )
  }

  function handleColumns () {
    if ( rows.length !== 0 ) {
      const row =  data[ 0 ],
            fields = Object.keys( row ).filter(( field ) => [ '__v', 'claps', 'comments', 'id', 'feature_img', 'text' ].indexOf( field ) === -1),
            columns = fields.map(( field ) => ({
              field,
              headerName: `${ field.charAt( 0 ).toUpperCase() }${ field.slice( 1 ) }`,
              renderCell: renderCellExpand,
              type: handleType( field ),
              flex: 1 / fields.length + 1,
              sortable: [ 'tags' ].indexOf( field ) !== -1 ? false : true
            }))
      setColumns( columns )
      setLoading( false )
    }
  }

  function handleEditorChange ( value, editor ) {
    setValues({ ...values, text: value })
  }

  function handleFileChange ( event ) {
    const { name, files } = event.target
    
    setValues({ ...values, [ name ]: files[0] })
    setPreview( URL.createObjectURL( files[0] ))
  }

  function handlePreview () {
    setModal({
      selected: null,
      title: 'Preview',
      type: 'preview'
    })
  }

  function handleRowClick ( params, event ) {
    setEditor( true )
    setData( data.filter(({ id }) => id === params.row.id)[ 0 ])
    setTagsArray( params.row.tags )
    setValues( data.filter(({ id }) => id === params.row.id)[ 0 ])
  }

  function handleType ( field ) {
    if ( field === 'published' )
      return 'boolean'

    if (  field === 'created' || field === 'updated' )
      return 'date'

    return 'string'
  }

  function isOverflown ( element ) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  function renderCellExpand ( params ) {
    const value = renderValue( params )
    return (
      <GridCellExpand field={ params.field || '' } value={ value || '' } width={ params.colDef.computedWidth } />
    );
  }

  function renderCloseButton () {
    if ( editor )
      return <Button onClick={ handleClose } color='error'  startIcon={ <CloseRounded /> }variant='contained' title='Close'>CLOSE EDITOR</Button>

    return null
  }

  function renderCreateButton () {
    if ( !editor )
      return <Button onClick={( e ) => setEditor( true ) } color='primary'  startIcon={ <AddCircleOutlineRounded /> } variant='contained' title='Create'>CREATE ARTICLE</Button>

    return null
  }

  // TODO: Sorting on Author & tags does not work
  function renderDataGrid () {
    return <Box sx={{ /* bgcolor: 'background.default',  */display: 'flex', height: '100%', p: 2, width: '100%' }}>
      <DataGrid
        columns={ columns }
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        filterModel={ filter }
        onFilterModelChange={( filter ) => {
          setFilter( filter )}
        }
        onPageSizeChange={( size ) => setPageSize( size )}
        onRowClick={ handleRowClick }
        onSortModelChange={( sort ) => console.log( sort )}
        pageSize={ pageSize }
        rows={ parsed }
        rowsPerPageOptions={[ 10, 25, 50, 100 ]}
        sx={{ bgcolor: 'background.main' }}
      />
    </Box>;
  }

  function renderModal () {
    const { selected, title, type, rest } = modal

    if (type !== null) {
      return (
        <Modal
          actions={{ close: handleClose }}
          data={ rest }
          id={ selected }
          fullWidth={ true }
          sx={{ alignItems: preview ? 'center' : 'normal', height: '100%', width: '100%' }}
          title={ title }
          type={ type }
        >
            <img src={ preview } style={{ height: 200 }} />
        </Modal>
      )
    }
  }

  function renderPublishButton () {
    if ( editor && !values.id )
      return <Button onClick={( e ) => dispatch( publish_article({ ...values, published: true, tags: tagsArray.filter(( tag ) => tag.length > 0), token }))} color='primary'  startIcon={ <PublishRounded /> }variant='contained' title='Publish'>PUBLISH</Button>

    return null
  }

  function renderSaveButton () {
    if ( editor )
      return <Button onClick={( e ) => dispatch( save_article({ ...values, tags: tagsArray.filter(( tag ) => tag.length > 0 ), token  }))} color='primary'  startIcon={ <SaveRounded /> }variant='contained' title='Publish'>SAVE</Button>

    return null
  }

  function renderTagChips ( array ) {
    if ( array.length > 0 )
    return (
      array.map(( tag, index ) => (
        <div key={ index } style={{ paddingLeft: 4 }} >
          <Chip label={ tag } />
        </div>
      ))
    )
  }

  function renderUploadButton () {
  return (
    <>
      <input            
        id='upload'
        encType='multipart/form-data'
        name='files'
        onChange={ handleFileChange }
        style={{ display: 'none' }}
        type='file'
      />
      <label htmlFor='upload'>
        <Button  color='primary' component='span'  startIcon={ <CloudUploadRounded /> } sx={{ width: 180 }} variant='contained' title='Update'>
          UPLOAD FILE(S)
        </Button>
      </label>
    </>
    )
  }

  function renderValue ( params ) {
    const { field } = params
    if ( field === 'author' )
      return params.row[ field ].username

    if ( field === 'created' )
      return format( parseISO( params.row[ field ]), 'P', fr)

    if ( field === 'updated' )
      return format( parseISO( params.row[ field ]), 'P', fr)

    if ( field === 'published' )
      return <Checkbox checked={ params.row[ field ] } name='published' />

    if ( field === 'tags' ) {
      if ( params.row[ field ].length > 0 )
      return (
        <div style={{ display: 'flex', paddingLeft: 4 }}>
          {params.row[ field ].map(( tag, index ) => (
            <div key={ index } style={{ paddingLeft: 4 }} >
              <Chip label={ tag } />
            </div>
          ))}
        </div>
      )
      
    }
    
    return params.row[ field ]
  }

  useEffect(() => {
    dispatch( load_articles())
  }, [ dispatch ])

  useEffect(() => {
    if ( data.length === 0 && rows.length !== 0 ) {
      setData( parsed )
    }
  }, [ rows ])

  useEffect(() => {
    if ( data[ 0 ]?.id && data.length !== 0 ) {
      handleColumns()
    }
  }, [ data ])

  useEffect(() => {
    if ( !editor && !Array.isArray( data )) {
      setData( parsed )
    }
    if ( !editor && action === 'ARTICLES.PUBLISH.SUCCESS' ) {      
      dispatch( load_articles())
    }

  }, [ editor ])

  useEffect(() => {
    if ( action === 'ARTICLES.PUBLISH.SUCCESS' ) {
      setEditor( false )
    }
    if ( action === 'ARTICLES.SAVE.SUCCESS' ) {
      dispatch( load_articles())
    }
  }, [ action ])

  return (
    <>
    {
      loading && columns.length === 0 ? 'Loading ...' :
      (
        <>
          <Box sx={{
            // bgcolor: 'background.default',
            display: 'flex',
            height: 65,
            justifyContent: !editor ? 'flex-start' : 'flex-end',
            p: 2,
            width: '100%'
          }}
          >
            { renderCreateButton() }
            <Stack direction='row' spacing={ 1 }>
              { renderSaveButton() }
              { renderPublishButton() }
              { renderCloseButton() }
            </Stack>
          </Box>
          {
            editor ?

            (
              <>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: 150, p: '0 16px', width: '100%' }}>
                  <Box sx={{  display: 'flex',  height: '100%', justifyContent: 'space-evenly', p:1, width: '100%' }}>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField id= 'title' label='Title' margin='dense' name= 'title' onChange={ handleChange } size='small' value={ values.title } variant='outlined'/>
                    </Box>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField id= 'description' label='Description' margin='dense' name= 'description' onChange={ handleChange } size='small' multiline rows={4} value={ values.description } variant='outlined'/>
                    </Box>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField
                        id='tags'
                        label='Tags'
                        margin='dense'
                        name= 'tags'
                        onChange={ handleChange }
                        onKeyPress={( e ) => {
                          if ([ ',' ].indexOf( e.key ) !== -1 && e.target.value.split(',') )
                            return setTagsArray( e.target.value.split(',') )
                        }}
                        size='small'
                        variant='outlined'/>
                      { renderTagChips( tagsArray ) }
                    </Box>
                    <Stack direction='column' alignItems='center' spacing={ 0.5 } sx ={{ width: '30%' }}>
                      <FormControlLabel control={ <Checkbox checked={ values.published } name='published' onChange={ handleCheck } /> } label='Published' />
                      { renderUploadButton() }
                      { !preview ? null : <Button onClick={ handlePreview } startIcon={ <PreviewRounded /> } sx={{ width: 180 }} variant='outlined'>Preview</Button> }
                    </Stack>
                  </Box>
                </Box>
                <Box sx={{ height: '100%', p:'0 16px 16px 16px', width: '100%' }}>
                  <EditorComponent data={ data.text } onEditorChange={ handleEditorChange } />
                </Box>
              </>
            ) :

            renderDataGrid()
          }
          { renderModal() }
        </>
      )
    }
    </>
  )
}
