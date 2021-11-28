import * as fs from 'fs';

type config = {
	port: (number | undefined);
	backLog: (number | undefined);
	archStr: (string[] | undefined);
}


const load_conf = (fileName: string) => {
	let conf: config;
	let confTemp = {
		port: <any>undefined,
		backLog: <any>undefined,
		archStr: <any>undefined
	}
	let file = fs.readFileSync(fileName,'utf8');
	let file2 = file.split("\r\n");
	file2.forEach((obj:any) => {
		const v = obj.split("=");
		switch(v[0]) {
			case "PORT": {
				confTemp["port"] = Number(v[1]);
				break;
			}
			case "BACKLOG": {
				confTemp["backLog"] = Number(v[1]);
				break;
			}
			case "ARCHIVOS": {
				confTemp["archStr"] = v[1].split(",");
				break;
			}
		}
	})
	conf = Object.assign(confTemp)
	return conf;
}

console.log(load_conf("src/ej1/config.txt"))