const strToArray = (strList: string) => {
	const array = strList.split(",")
	return([array, array.length])
}

console.log(strToArray("Tengo hambre,aaaaa,aguante javascript"))

// Easy