export const dateTime = (createdAt)=>{
    let dateObj = new Date(createdAt);
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let date = dateObj.getDate();

    return `${date}/${month}/${year}`
}