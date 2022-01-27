import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, InputLabel, Stack, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import EditorComponent from '../components/editor';
import Modal from '../components/modal';
import { load_articles, publish_article } from '../redux/actions/articles';
import { MyDeleteOutline } from '../styles/styles';
import {
  AddCircleOutlineRounded,
  CloseRounded,
  CloudUploadRounded,
  PreviewRounded,
  PublishRounded
} from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';

export default function Blog () {
  const dispatch = useDispatch(),
        { action, articles, auth } = useSelector(( state )=> state ),
        { article, rows } = articles,
        { token } = auth.profile,
        [ columns, setColumns ] = useState([]),
        parsed = rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest })),
        [ loading, setLoading ] = useState( true ),
        [ data, setData ] = useState( parsed ),
        [ preview, setPreview ] = useState( null ),
        [ values, setValues ] = useState({
          title: '',
          description: '',
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

  function handleColumns () {
    const row =  data[ 0 ],
          fields = Object.keys( row ).filter(( field ) => [ '__v' ].indexOf( field ) === -1),
          columns = fields.map(( field ) => ({
            field,
            headerName:  `${ field.charAt( 0 ).toUpperCase() }${ field.slice( 1 ) }`,
            valueGetter: ( params ) => {
              if ( field === 'author' )
                return params.row[ field ].username

              if ( field === 'claps' )
                return params.row[ field ].count

              if ( field === 'comments' )
                return params.row[ field ].length !== 0 ? params.row[ field ].length : 0

              if ( field === 'created' )
                return formatDistanceToNow( parseISO( params.row[ field ]))

              if ( field === 'updated' )
                return formatDistanceToNow( parseISO( params.row[ field ]))
              
              return params.row[ field ]
            },
            width: 140
          }))

    setColumns( columns )
    setLoading( false )
  }

  function handleEditorChange ( value, editor ) {
    setValues({ ...values, text: value })
  }

  function handleChange ( event ) {
    const { name, value } = event.target
    
    setValues({ ...values, [ name ]: value })
  }

  function handleFileChange ( event ) {
    const { name, files } = event.target
    
    setValues({ ...values, [ name ]: files[0] })
    setPreview( URL.createObjectURL( files[0] ))
  }

  function handleClose () {
    setModal({
      selected: null,
      title: null,
      type: null
    })
  }

  function handleCreate ( e ) {
    setModal({
      selected: null,
      title: 'Create',
      type: 'create'
    })
  }

  function handleEdit ( e, { id, ...rest } ) {
    setModal({
      selected: id,
      title: 'Edit',
      type: 'update',
      rest
    })
  }

  function handlePreview () {
    setModal({
      selected: null,
      title: 'Preview',
      type: 'preview'
    })
  }

  function handleRowClick ( params, event ) {
    handleEdit( event, params.row )
  }

  function handleSearch () {
    setModal({
      selected: null,
      title: 'Search',
      type: 'search'
    })
  }

  function renderCloseButton () {
    if ( editor )
      return <Button onClick={( e ) => setEditor( false ) } color='error'  startIcon={ <CloseRounded /> }variant='contained' title='Close'>CLOSE EDITOR</Button>

    return null
  }

  function renderPublishButton () {
    if ( editor )
      return <Button onClick={( e ) => dispatch( publish_article({ ...values, tags: tagsArray, token }))} color='primary'  startIcon={ <PublishRounded /> }variant='contained' title='Publish'>PUBLISH</Button>

    return null
  }

  function renderCreateButton () {
    if ( !editor )
      return <Button onClick={( e ) => setEditor( true ) } color='primary'  startIcon={ <AddCircleOutlineRounded /> } variant='contained' title='Create'>CREATE ARTICLE</Button>

    return null
  }

  function renderTagChips () {
    if ( tagsArray.length > 0 )
    return (
      tagsArray.map(( tag, index ) => (
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

  console.log( 'values => ', values )

  useEffect(() => {
    dispatch( load_articles())
  }, [ dispatch ])

  useEffect(() => {
    if ( data.length === 0 && rows.length !== 0 ) {
      setData( parsed )
    }
  }, [ rows ])

  useEffect(() => {
    if ( data[ 0 ]?.id && data.length !== 0 && columns.length === 0 ) {
      handleColumns()
    }
  }, [ data ])

  useEffect(() => {
    if ( action === 'ARTICLES.PUBLISH.SUCCESS' ) {
      setEditor( false )
    }
  }, [ action ])

  console.log( tagsArray )
  return (
    <>
    {
      loading && columns.length === 0 ? 'Loading ...' :
      (
        <>
          <Box sx={{
            bgcolor: 'background.paper',
            boxShadow: '10px 5px 5px grey',
            display: 'flex',
            height: 65,
            justifyContent: !editor ? 'flex-start' : 'flex-end',
            p: 2,
            width: '100%'
            }}>
            { renderCreateButton() }
            { renderPublishButton() }
            { renderCloseButton() }
          </Box>
          {
            editor ?

            (
              <>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: 150, p: '0 16px', width: '100%' }}>
                  <Box sx={{  display: 'flex',  height: '100%', justifyContent: 'space-evenly', p:1, width: '100%' }}>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField id= 'title' label='Title' margin='dense' name= 'title' onChange={ handleChange } size='small' variant='outlined'/>
                    </Box>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField id= 'description' label='Description' margin='dense' name= 'description' onChange={ handleChange } size='small' multiline rows={4} variant='outlined'/>
                    </Box>
                    <Box sx={{  display: 'flex', flexDirection: 'column', width: '30%' }}>
                      <TextField
                        id='tags'
                        label='Tags'
                        margin='dense'
                        name= 'tags'
                        onChange={ handleChange }
                        onKeyPress={( e ) => {
                          if ([ ',' ].indexOf( e.key ) !== -1 )
                            return setTagsArray( e.target.value.split(',') )
                        }}
                        size='small'
                        variant='outlined'/>
                      { renderTagChips() }
                    </Box>
                    <Stack direction='column' alignItems='center' spacing={ 1 } sx ={{ width: '30%' }}>
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

            <Box sx={{ bgcolor: 'background.paper', display: 'flex', height: '100%', p: 2, width: '100%' }}>
                <DataGrid
                  rows={ data }
                  onRowClick={ handleRowClick }
                  rowsPerPageOptions={[ 10, 25, 50, 100 ]}
                  disableSelectionOnClick
                  columns={ columns }
                  pageSize={ 10 }
                  checkboxSelection
                  components={{ Toolbar: GridToolbar }} 
                />
            </Box>
          }
          { renderModal() }
        </>
      )
    }
    </>
  )
}
