=ARRAYFORMULA(
    IF(
        ISBLANK( A2:A100 ),
        "",
        HYPERLINK( A2:A100, "Link" )
    )
)