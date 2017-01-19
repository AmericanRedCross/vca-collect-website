var settings = {}

settings.app = {
  defaultpass: '123',
  defaultuser: 'me',
	port: 3002,
	db: 'site.db',
  s3bucket: 'ifrc-vca'
  //Amazon S3 Credentials are stored in ~/.aws/credentials (see: http://aws.amazon.com/sdk-for-node-js/)
}

settings.website = {

}

module.exports = settings;
