import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    //TODO injecter la css uniquement en edit idem pour les truc jahia
    return (
        <Html>
            <Head>
                <link type="text/css" href="/gwt/resources/css/jahia-anthracite/edit.css" rel="stylesheet"/>
            </Head>
            <body jahia-parse-html="true">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
