var settings = {}

settings.app = {
  defaultpass: '123',
  defaultuser: 'me',
	port: 3002,
	db: 'site.db',
  s3bucket: 'ifrc-vca'
  //Amazon S3 Credentials are stored in ~/.aws/credentials (see: http://aws.amazon.com/sdk-for-node-js/)
}

settings.page = {
  nginxlocation: "/",
  nav: {
    home: {
      en: {
        text: "Home",
        url: "/"
      }
      ,es: {
        text: "Inicio",
        url: "/es/"
      }
      ,fr: {
        text: "Page d’accueil",
        url: "/fr/"
      }
    }
    ,find: {
      en: {
        text: "Find",
        url: "/find/"
      }
      ,es: {
        text: "Buscar",
        url: "/es/buscar/"
      },fr: {
        text: "Trouver",
        url: "/fr/trouver/"
      }
    }
    ,share: {
      en: {
        text: "Share",
        url: "/share/"
      }
      ,es: {
        text: "Subir",
        url: "/es/subir/"
      },fr: {
        text: "Share",
        url: "/fr/participer/"
      }
    }
  }
}

module.exports = settings;
