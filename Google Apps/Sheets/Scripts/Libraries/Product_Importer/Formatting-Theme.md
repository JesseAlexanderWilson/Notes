---
tags: [Notebooks/Google_Sheets/Libraries/Product_Importer]
title: Formatting-Theme
created: '2019-10-21T09:52:49.914Z'
modified: '2019-10-21T09:52:49.916Z'
---

[TOC](@note/Notebooks/Google_Sheets/Libraries/Product_Importer/TOC.md)

## Formatting-Theme

```js
function my_customTheme( input ) {
  var defaultTheme = {
    header: '#bdbdbd',
    alert: {
      success: '#b7e1cd',
      warning: '#fce8b2',
      danger:  '#f4c7c3'
    }
  };
  
  switch( input ) {
    case 'index':
      return my_indexTheme();
      break;
    case 'banding':
    return my_bandingTheme();
      break;
    default:
      return defaultTheme;
  };
}

//------------------------------------------------------------------------------

function my_indexTheme() {
  var theme = {
    header: '#bdbdbd',
    alert: {
      success: '#b7e1cd',
      warning: '#fce8b2',
      danger:  '#f4c7c3'
    },
    introduction: {
      lesson: '#ffff00',
      topic:  '#00ffff'
    }
  };
  return theme;
}

```

[TOC](@note/Notebooks/Google_Sheets/Libraries/Product_Importer/TOC.md)
