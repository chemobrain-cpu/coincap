export const validateEmail = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <=4 ){
        error="characters size too small"
    }
    else if(!data.match(/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        error="email is not valid"
    }
    else{
        error = ""
    }
    return error
}
export const validateText = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    else if(data.length <=2 ){
        error="characters size too small"
        return error
    }
    else if(!data.match(/[a-zA-Z]/g)){
        error="text is not valid"
        return error
    }
    else{
        error = ""
        return error
    }
    
}
export const validatePhoneNumber = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
    else if(data.length <= 2 ){
        error="characters size too small"
    }
    else if(!data.match(/[0-9]/g)){
        error="number is not valid"
    }
    else{
        error = ""
    }
    return error
}

export const hashFun = (num) => {
    let numArr = []
    for (let char of num) {
        numArr.push(char)
    }
    let hash = ""
    for (let i = 0; i < numArr.length; i++) {
        if (i < numArr.length - 2) {
            hash = hash + "*"
        } else {
            hash = hash + numArr[i]
        }
    }
    return hash

}

export const truncate = (str, len) => {
    if (str.length > len) {
        if (len <= 3) {
            return str.slice(0, len - 3) + "...";
        }
        else {
            return str.slice(0, len) + "...";
        };
    }
    else {
        return str;
    };
};






