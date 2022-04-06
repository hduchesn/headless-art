export default {
    baseUrl: 'http://localhost:8080',
    siteName: 'headless-industrial',
    token: 'V+InkyRlQ/65oZIJ1TEFcYcfgC1Wyk7LE81s9v84CY0=',
    cnd_type : {
        WIDEN_IMAGE:"wdennt:image",
        WIDEN_VIDEO:"wdennt:video",
        EXT_VIDEO:'ext:video',
        JNT_FILE:'jnt:file',
        IMAGE:'jmix:image',
        HALFBLOCK_IMAGE:'hicnt:image',
        INDUS_TEXT:'hicnt:text'
    },
    paths:{//TODO remove locale from path to add it dynamically
        preview:'/cms/render/default/en',
        edit:'/cms/editframe/default/en'
    }
}
