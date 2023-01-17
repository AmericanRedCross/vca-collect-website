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
        id: "link-home",
        text: "Home",
        url: "/"
      }
      ,es: {
        id: "link-home",
        text: "Inicio",
        url: "/es"
      }
      ,fr: {
        id: "link-home",
        text: "Page d’accueil",
        url: "/fr"
      }
    }
    ,find: {
      en: {
        id: "link-find",
        text: "Find",
        url: "/find"
      }
      ,es: {
        id: "link-find",
        text: "Buscar",
        url: "/es/buscar"
      },fr: {
        id: "link-find",
        text: "Trouver",
        url: "/fr/trouver"
      }
    }
    ,trends: {
      en: {
        id: "link-trends",
        text: "Global Trends",
        url: "/trends"
      }
      ,es: {
        id: "link-trends",
        text: "Global Trends",
        url: "/es/trends"
      },fr: {
        id: "link-trends",
        text: "Global Trends",
        url: "/fr/trends"
      }
    }
    ,profiles: {
      en: {
        id: "link-profiles",
        text: "Community Profiles",
        url: "/profiles"
      }
      ,es: {
        id: "link-profiles",
        text: "Community Profiles",
        url: "/es/profiles"
      },fr: {
        id: "link-profiles",
        text: "Community Profiles",
        url: "/fr/profiles"
      }
    }
    ,share: {
      en: {
        id: "link-share",
        text: "Share",
        url: "/share"
      }
      ,es: {
        id: "link-share",
        text: "Subir",
        url: "/es/subir"
      },fr: {
        id: "link-share",
        text: "Participer",
        url: "/fr/participer"
      }
    }
  }
}

module.exports = settings;
