import React, { memo, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function isOverflown( element ) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

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
            sx={{ bgcolor: 'background.main', minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant='body2' sx={{ alignItems: 'center', display: 'flex', p: 2 }} >
              { value }
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
})

export default function renderCellExpand( params ) {
  const value = renderValue( params )
  return (
    <GridCellExpand field={ params.field || '' } value={ value || '' } width={ params.colDef.computedWidth } />
  );
}

function renderValue ( params ) {
  const { colDef, field } = params

  if( colDef.type === 'date' && params.row[ field ])
    return format( parseISO( params.row[ field ]), 'Pp', { locale: fr })

  if ( field === 'tags' ) {
    if ( params.row[ field ].length > 0 )
    return (
      <div style={{ display: 'flex', paddingLeft: 4 }}>
        {
          params.row[ field ].map(( tag, index ) => (
            <div key={ index } style={{ paddingLeft: 4 }} >
              <Chip label={ tag } />
            </div>
          ))
        }
      </div>
    )    
  }
  
  return params.row[ field ]
}
