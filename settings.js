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
    }
    ,find: {
      en: {
        text: "Find",
        url: "/find/"
      }
      ,es: {
        text: "Encontrar",
        url: "/es/encontrar/"
      }
    }
    ,share: {
      en: {
        text: "Share",
        url: "/share/"
      }
      ,es: {
        text: "Compartir",
        url: "/es/compartir/"
      }
    }
  }
}

module.exports = settings;
