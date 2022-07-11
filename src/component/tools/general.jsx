export function email2url(email){
    let email_ = email;
    email_ = email_.replaceAll("@", "_at_")
    email_ = email_.replaceAll(".", "_dot_")
    return email_
}

export function url2email(url){
    let url_ = url;
    url_ = url_.replaceAll("_at_", "@")
    url_ = url_.replaceAll("_dot_", ".")
    return url_
}