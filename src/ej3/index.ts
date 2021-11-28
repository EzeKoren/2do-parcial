import * as fs from 'fs';
import WebSocket from 'ws'

const TransferFilesData = (socketPort: number, filesArray: string, arraySize: number) => {
	if (filesArray.length > arraySize) {
		// Código basura para imitar el comportamiento de C
		// filesArray puede tener arraySize como tamaño máximo
		let a = filesArray.split('').map((char:string, index:number) => {
			return index < arraySize ? char : undefined ;
		}).join('');
		filesArray = a;
	}
	const files = filesArray.split(",")
	console.log(files)
	const dir = `ws://localhost:${socketPort}/`
	const ws = new WebSocket(dir);

	
	ws.on('open', () => {
		console.log("opened");
		files.forEach(file => {
			ws.send(fs.readFileSync(file,'utf8'));
		});
		ws.close()
	});
}

TransferFilesData(2020, "src/ej3/config.txt,src/ej3/whyAmiDoingThis.txt,src/ej3/wontEvenSeeThis.txt", 46);