

export const errorTranslate = (msgStr, that) => {


  let msg = msgStr.toString().replace(/(^\s*)|(\s*$)/g, "");    //首尾去重
	if(msg == 'invalid parameter'){
		msg = '无效参数';
	}else if(msg == 'manager cannot in joinDepartment'){
		msg = '项目经理不能作为参与员工';
	}else if(msg == 'project code repeat'){
		msg = '项目编号重复';
	}else if(msg == 'project name repeat'){
		msg = '项目名字重复';
	}else if(msg == 'There are ongoing project or employee'){
		msg = '此部门有正在进行的项目或未离职的员工';
	}else if(msg == 'the department already exists'){
		msg = '此部门已存在';
	}else if(msg == 'this email already exists'){
		msg = '邮箱已存在';
	}else if(msg == 'username not exist or password wrong'){
		msg = '邮箱不存在或密码错误';
	}else if(msg == 'this employee has left'){
		msg = '此员工已离职';
	}else{
		msg = '未知错误，请与管理员联系';
  }
  if(that){
    that.$message.error(`请求错误，${msg}`);
    // that.$notify.error({
    //   title: '请求错误',
    //   message: msg
    // });
  }
  return msg
}

export const errorAlert = (that, msg = '请与管理员联系') => {
  if(that){
    that.$message.error(`请求错误，${msg}`);
    // that.$notify.error({
    //   title: '请求错误',
    //   message: msg
    // });
  }
}
