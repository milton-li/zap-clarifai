const Clarifai = require("clarifai");
const app = new Clarifai.App({
	apiKey: "50f87e02603f4a539dfd48872ee2a833"
});

function makeReq(urlStr:string) : Promise<string> {
	return new Promise((resolve, reject) => {
		var url: URL;
		try {
			url = new URL(urlStr);
		} catch (e) {
			reject(e);
		}
		app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
	      .then((generalModel: { predict: (arg0: string) => void; }) => {
	        var r = generalModel.predict(urlStr);
					console.log(r);
					return r;
	      })
	      .then((response: { [x: string]: { [x: string]: { [x: string]: any; }; }[]; }) => {
	        var concepts = response['outputs'][0]['data']['concepts']
					resolve(JSON.stringify(concepts));
	      }).catch((err:any) => {
					reject(err);
				});
	});


}

export async function getResponse(query:string,params:string[]|[]){
	try {
		var res:string = await makeReq(params[0]);
		console.log("RESULT: " + res);
		return [res];
	} catch (e) {
		console.log("PROMISE ERROR: " + e);
		return ["failure"];
	}
}
