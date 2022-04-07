import React, { memo, useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, Chip, FormControlLabel, Paper, Popper, Stack, TextField, Typography } from '@mui/material';
import {
  AddCircleOutlineRounded,
  CloseRounded,
  CloudUploadRounded,
  PreviewRounded,
  PublishRounded,
  SaveRounded
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import EditorComponent from '../components/editor';
import GridComponent from '../components/grid';
import Modal from '../components/modal';

import { get_article, load_articles, publish_article, save_article } from '../redux/actions/articles';

import { default as grid } from '../../config/grid';
const S3_URL = `${ process.env.S3_URL }`
export default function Blog () {
  const dispatch = useDispatch(),
        { action, articles, auth } = useSelector(( state )=> state ),
        { article, rows } = articles,
        { token } = auth.profile,
        parsed = rows.map(({ _id: id, createdAt: created, updatedAt: updated, ...rest }) => ({ id, created, updated, ...rest })),
        [ loading, setLoading ] = useState( true ),
        [ data, setData ] = useState( parsed ),
        [ values, setValues ] = useState({
          title: '',
          description: '',
          published: false,
          chips: [],
          tags: '',
          text: ''
        }),
        [ preview, setPreview ] = useState( null ),
        [ modal, setModal ] = useState({
          selected: null,
          title: null,
          type: null
        }),
        [ editor, setEditor ] = useState( false ),
        [ tagsChips, setChips ] = useState([]),
        [ dirty, setDirty ] = useState( false ),
        { columns, reloadOn } = grid.blog;

  function handleCancel ( event ) {
    setModal({
      selected: null,
      title: null,
      type: null
    })
  }

  function handleChange ( event ) {
    const { name, value } = event.target
    setValues({ ...values, [ name ]: value })
  }

  function handleCheck ( event ) {
    const { name, checked } = event.target
    
    setValues({ ...values, [ name ]: checked })
  }

  function handleClose ( event ) {
    console.log({ modal })
    setModal({
      selected: null,
      title: null,
      type: null
    })

    if ( modal.type === 'warning' ) {
      return handleValidateClose ()
    }

    if( !modal.type ) {
      setEditor( false )
    }
  }

  function handleCloseEditor ( event ) {
    if ( dirty ) {
      return setModal({
        content: <h4> Your work is not saved. Do you really want to close the editor?</h4>,
        selected: null,
        title: 'Warning',
        type: 'warning',
      })
    }

    setEditor( false )
    /* if ( modal.type === 'warning' ) {
      return handleValidateClose ()
    }

    if( !modal.type ) {
    } */
  }

  function handleDirty () {
    setDirty( true )
  }

  function handleEditorChange ( value, editor ) {
    setValues({ ...values, text: value })
  }

  function handleFileChange ( event ) {
    const { name, files } = event.target
    
    setValues({ ...values, [ name ]: files[ 0 ]})
    setPreview( URL.createObjectURL( files[ 0 ]))
  }

  function handlePublish ( event ) {
    dispatch( publish_article({ ...values, published: true, tags: tagsChips.filter(( tag ) => tag.length > 0), token }))
    
    setValues({
      title: '',
      description: '',
      published: false,
      tags: '',
      text: ''
    })
    setChips([])
    setPreview(null)
    
    setEditor( false )
  }

  function handlePreview () {
    setModal({
      content: <img src={ preview } style={{ height: 200 }} />,
      selected: null,
      title: 'Preview',
      type: 'preview'
    })
  }

  function handleRowClick ( params, event ) {
    dispatch( get_article( params.row.id ))
    setChips( params.row.tags )
    setValues( data.filter(({ id }) => id === params.row.id)[ 0 ])
    setEditor( true )
  }

  function handleSave ( params, event ) {
    dispatch( save_article({ ...values, tags: tagsChips.filter(( tag ) => tag.length > 0 ), token  }))
  }

  function handleValidateClose () {
    setEditor( false )
  }

  function loadData () {    
    dispatch( load_articles())
  }

  function renderCloseButton () {
    if ( editor )
      return <Button onClick={ handleCloseEditor } color='error'  startIcon={ <CloseRounded /> }variant='contained' title='Close'>CLOSE EDITOR</Button>

    return null
  }

  function renderCreateButton () {
    if ( !editor )
      return <Button onClick={( e ) => setEditor( true ) } color='primary'  startIcon={ <AddCircleOutlineRounded /> } variant='contained' title='Create'>CREATE ARTICLE</Button>

    return null
  }

  function renderModal () {
    const { content, selected, title, type, rest } = modal

    if ( type !== null )
      return (
        <Modal
          actions={{ cancel: handleCancel, close: handleClose, warning: handleValidateClose }}
          data={ rest }
          id={ selected }
          fullWidth={ true }
          sx={{ alignItems: preview ? 'center' : 'normal', height: '100%', width: '100%' }}
          title={ title }
          type={ type }
        >
          { content }
        </Modal>
      )
  }

  function renderPublishButton () {
    if ( editor && !values.id )
      return <Button color='primary' disabled={ !dirty } onClick={ handlePublish } startIcon={ <PublishRounded /> } variant='contained' title='Publish'>PUBLISH</Button>

    return null
  }

  function renderSaveButton () {
    if ( editor && values.id )
      return <Button color='primary' disabled={ !dirty } onClick={ handleSave }  startIcon={ <SaveRounded /> } variant='contained' title='Publish'>SAVE</Button>

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

  useEffect(() => {
    if ( editor && action === 'ARTICLES.LOAD.SUCCESS' ) {
      setData( parsed )
    }
    
    if ( reloadOn.indexOf( action ) !== -1 ) {
      setValues({
        title: '',
        description: '',
        published: false,
        tags: '',
        text: ''
      })
      dispatch( load_articles())
    }
  }, [ action ])

  useEffect(() => {
    if ( !article.text ) {
      setDirty( false )
    }
  }, [ article ])

  useEffect(() => {
    // console.log( 'dirty => ', dirty )
    // console.log( 'modal.type => ', modal.type )
  }, [ dirty ])

  useEffect(() => {
    dispatch( load_articles())
  }, [ dispatch ])

  useEffect(() => {
    if ( !editor ) {
      setChips([])
      setDirty( false )
      setPreview( null )
      setValues({
        title: '',
        description: '',
        published: false,
        tags: '',
        text: ''
      })
      loadData()
    }
  }, [ editor ])

  useEffect(() => {
    if ( data.length === 0 && rows.length !== 0 ) {
      setData( parsed )
    }
  }, [ rows ])

  useEffect(() => {
    if ( values.feature_img ) {
      setPreview( `${ S3_URL }${ values.feature_img }` )
    }
  }, [ values ])

  // console.log( 'blog state dirty => ', dirty, modal )

  return (
    <>
    {
      loading && columns.length === 0 ? 'Loading ...' :
      (
        <>
          <Box sx={{
            // bgcolor: 'background.default',
            borderBottom: 'solid 1px grey',
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
                            return setChips( e.target.value.split(',') )
                        }}
                        size='small'
                        value={ values.tags }
                        variant='outlined'
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 85, overflow: 'auto' }}>
                        { renderTagChips( tagsChips ) }
                      </div>
                    </Box>
                    <Stack direction='column' alignItems='center' spacing={ 0.5 } sx ={{ width: '30%' }}>
                      <FormControlLabel control={ <Checkbox checked={ values.published } name='published' onChange={ handleCheck } /> } label={ values.published ? 'Publish' : 'Published' } />
                      { renderUploadButton() }
                      { !preview ? null : <Button onClick={ handlePreview } startIcon={ <PreviewRounded /> } sx={{ width: 180 }} variant='outlined'>Preview</Button> }
                    </Stack>
                  </Box>
                </Box>
                <Box sx={{ height: '100%', p:'0 16px 16px 16px', width: '100%' }}>
                  <EditorComponent initialValue={ article.text || '' } onDirty={ handleDirty } onEditorChange={ handleEditorChange } value={ values.text } />
                </Box>
              </>
            ) :

            <GridComponent
              actions={{ select: handleRowClick }}
              columns={ columns }
              data={ data }
            />
          }
          { renderModal() }
        </>
      )
    }
    </>
  )
}
