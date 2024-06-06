module.exports = {
    validate:{
        required:{
            email:'Email là bắt buộc.',
            name:'Tên người dùng là bắt buộc.',
            password:'Mật khẩu là bắt buộc.'
        },
        format:{
            email:'Email không hợp lệ.'
        },
        min:{
            name:'Tên người dùng phải có ít nhất {#limit} ký tự.'
        },
        max: {
            name:'Tên người dùng không được quá {#limit} ký tự.'
        }
    }
}