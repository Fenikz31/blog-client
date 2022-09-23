import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

import { Editor } from '@tinymce/tinymce-react';


export default function EditorComponent ({
  initialValue = '',
  onDirty,
  onEditorChange,
  value
} = {}) {
  function renderEditor () {
    return (
      <Editor
        init={{
          height: '100%',
          menubar: 'file edit view insert format tools table  help',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks emoticons code fullscreen',
            'insertdatetime media table paste textpattern codesample help wordcount'
          ],
          toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl`,
          image_title: true,
          automatic_uploads: true,
          branding: false,
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          image_caption: true,
          toolbar_mode: 'sliding',
          contextmenu: 'link image imagetools table',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_types: 'file image media',
          /* and here's our custom image picker*/
          file_picker_callback: function ( cb, value, meta ) {
            const input = document.createElement('input');
            input.setAttribute( 'type', 'file' );
            input.setAttribute( 'accept', '*/*' );
        
            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */
        
            input.onchange = function () {
              const file = this.files[0];
        
              const reader = new FileReader();
              reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + ( new Date()).getTime();
                const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split( ',' )[ 1 ];
                const blobInfo = blobCache.create( id, file, base64 );
                blobCache.add( blobInfo );
        
                /* call the callback and populate the Title field with the file name */
                cb( blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL( file );
            };
        
            input.click();
          },
          /* and here's our custom image picker*/
          file_picker_callback: function ( cb, value, meta ) {
            const input = document.createElement( 'input') ;
            input.setAttribute( 'type', 'file' );
            input.setAttribute( 'accept', '*/*' );

            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */

            input.onchange = function () {
              const file = this.files[ 0 ];

              const reader = new FileReader();
              reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + ( new Date()).getTime();
                const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split( ',' )[ 1 ];
                const blobInfo = blobCache.create( id, file, base64);
                blobCache.add( blobInfo );

                /* call the callback and populate the Title field with the file name */
                cb( blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL( file );
            };

            input.click();
          },
        }}
        initialValue={ initialValue }
        onDirty={ onDirty }
        onEditorChange={ onEditorChange }
        textareaName='editor'
        value={ value }
       />
    )
  }

  return (
    <>
      { renderEditor() }
    </>
  )
}
