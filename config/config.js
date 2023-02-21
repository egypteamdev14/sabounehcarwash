const development_domain_server = "http://192.168.0.108:3030"

const production_domain_server = ''

const development_path_server = ''
const production_path_server = ''

const development = {
	apiGateway: {
		URL: development_domain_server,

	}
}

const production = {
	apiGateway: {
		URL: production_domain_server + production_path_server,

	}
};


const config = process.env.NODE_ENV === "production" ? production : development;

export default config;