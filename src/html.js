import React from 'react'

class Html extends React.Component {
  render() {
    return (
      <html lang="de">
        <head>
          {this.props.headComponents}
          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <title>GLOSSBOSS</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <meta
            name="description"
            content="Glossboss.de - Produkttests, Anleitungen, Pflegeberichte und viel mehr - Ein Autopflegeblog von und für absolute Enthusiasten"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
<script data-ad-client="ca-pub-1061755440554644" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

export default Html
