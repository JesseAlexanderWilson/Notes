`wysiwyg-form_field.php`
```js
<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class Wysiwyg extends ElementorPro\Modules\Forms\Fields\Field_Base {

    public $depended_scripts = [
        'tinymce-cdn',
    ];

    public function get_type() {
        return 'wysiwyg';
    }

    public function get_name() {
        return __( 'Wysiwyg', 'elementor-pro' );
    }

    /**
     * @param      $item
     * @param      $item_index
     * @param Form $form
     */
    public function render( $item, $item_index, $form ) {

        $form->add_render_attribute( 'textarea' . $item_index, 'class', 'elementor-tinymce' );

        echo '<textarea ' . $form->get_render_attribute_string( 'input' . $item_index ) . '></textarea>';
    }

    public function register_field_type( $fields ) {
        ElementorPro\Plugin::instance()->modules_manager->get_modules( 'forms' )->add_form_field_type( self::get_type(), $this );
        $fields[ self::get_type() ] = self::get_name();
        return $fields;
    }

    public function front_end_inline_JS() {
        ?>
        <script>
            var ElementorFormWysiwyg = ElementorFormWysiwyg || {};
            jQuery( document ).ready( function( $ ) {
                ElementorFormWysiwyg = {
                    onReady: function( callback ) {
                        if ( window.tinymce ) {
                            callback();
                        } else {
                            // If not ready check again by timeout..
                            setTimeout( function() {
                                ElementorFormWysiwyg.onReady( callback );
                            }, 350 );
                        }
                    },
                    init: function() {
                        self = this;
                        this.onReady( function() {
                            tinymce.init({
                                selector: 'textarea[type="wysiwyg"]',
                                setup: function (editor) {
                                    editor.on('change', function () {
                                        editor.save();
                                    });
                                },
                                menubar: false,
                                plugins: 'preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                                toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image table media'
                            });
                        } );
                    }
                };
                ElementorFormWysiwyg.init();
            } );
        </script>
        <?php
    }

    public function editor_inline_JS() {
        add_action( 'wp_footer', function() {
        ?>
        <script>
            var ElementorFormWysiwygField = ElementorFormWysiwygField || {};
            jQuery( document ).ready( function( $ ) {
                ElementorFormWysiwygField = {
                    onReady: function( callback ) {
                        if ( window.tinymce ) {
                            callback();
                        } else {
                            // If not ready check again by timeout..
                            setTimeout( function() {
                                ElementorFormWysiwygField.onReady( callback );
                            }, 350 );
                        }
                    },
                    renderField: function( inputField, item, i, settings ) {
                        var itemClasses = item.css_classes,
                            required = '',
                            fieldName = 'form_field_';

                        if ( item.required ) {
                            required = 'required';
                        }
                        return '<textarea type="wysiwyg" class="elementor-wysiwyg elementor-field ' + itemClasses + '" name="' + fieldName + '" id="form_field_' + i + '" ' + required + '></textarea>';
                    },
                    initTinyMce: function() {
                        tinymce.remove();
                        tinymce.init({
                            selector: 'textarea[type="wysiwyg"]',
                            setup: function (editor) {
                                editor.on('change', function () {
                                    editor.save();
                                });
                            },
                            menubar: false,
                            plugins: 'preview searchreplace autolink directionality visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image table media'
                        });
                    },
                    init: function() {
                        self = this;
                        this.onReady( function() {
                            elementorFrontend.hooks.addAction( 'frontend/element_ready/form.default', ElementorFormWysiwygField.initTinyMce );
                            elementor.hooks.addFilter( 'elementor_pro/forms/content_template/field/wysiwyg', ElementorFormWysiwygField.renderField, 10, 4 );
                        } );
                    }
                };
                ElementorFormWysiwygField.init();
            } );
        </script>
        <?php
        } );
    }

    public function sanitize_field( $value, $field ) {
        return wp_kses_post( $field['raw_value'] );
    }

    public function __construct() {
        parent::__construct();
        add_filter( 'elementor_pro/forms/field_types', [ $this, 'register_field_type' ] );
        add_action( 'wp_footer', [ $this, 'front_end_inline_JS' ] );
        add_action( 'elementor/preview/init', [ $this, 'editor_inline_JS' ] );
        wp_register_script( 'tinymce-cdn', 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.8.5/tinymce.min.js' );
    }
}
```
And include it when needed:

```js
add_action( 'elementor_pro/init', function(){
    include_once( 'path/to/wysiwyg-form_field.php' );
    new Wysiwyg();
} );
```