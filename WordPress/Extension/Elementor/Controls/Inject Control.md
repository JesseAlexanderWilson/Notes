```php
<?php

add_action(
    'elementor/element/button/section_style/before_section_end',
    function( $element, $args ) {
    
        $element->start_injection( [
            'at' => 'before',
            'of' => 'button_text_color',
        ] );
        
        // add a control
        $element->add_control(
            'btn_style',
            [
                'label'        => 'Button Style',
                'type'         => \Elementor\Controls_Manager::SELECT,
                'options'      => [
                    'fancy'   => 'Fancy',
                    'stylish' => 'Stylish',
                    'rounded' => 'Rounded',
                    'square'  => 'Square',
                ],
                'prefix_class' => 'btn-style-',
            ]
        );
    
        $element->end_injection();
        
    },
    10,
    2
);
```