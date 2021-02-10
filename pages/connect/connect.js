const CB = wx.cloud.database().collection("react123");
let content="";
let boolean=false;
Page({

  data: {
    contact:"",
    noteMaxLen: 200,//备注最多200字数
    filepaths:"",
    otherimagepath:"/static/image/bus.jpg",
    phone:"",
    imagepath:""
  }, 

  formsubmit(e){
    var contact = e.detail.value.contact;
    let regPhone = /^1[3456789]\d{9}$/;
    if (content == ""&& contact!="") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不能为空!',
      })
      boolean=false;
    }
    else  if (contact == ""&&content!="") {
      wx.showModal({
        title: '提示',
        content: '手机号不能为空!',
      })
     boolean=false;
    }
    else if (contact == "" && content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容,手机号不能为空!',
      })
     boolean=false;
    }
    else if ((!regPhone.test(contact)||contact.length<11 ))  {   //验证手机号
      wx.showToast({
        title: '您输入的手机号码有误',
        icon: 'none',
        duration: 2000
      })
      boolean=false;
    }
   else {
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 2000,
      })   
      this.setData({
        //"data.content":_content,
        contact:contact,
       }) 
      boolean=true;
      // 在C页面内 navigateBack，将返回A页面
       wx.navigateBack({
        delta: 1
        })
    }
  
},
addtextandwordlimit(event){
 content=event.detail.value;
 var value = event.detail.value, len = parseInt(value.length);
  if (len > this.data.noteMaxLen) return;

  this.setData({
    currentNoteLen: len //当前字数  
  });

}, 
getData(e){ 
  if(boolean){  
    var getdata=this.data;
          CB.add({
          data:{
             反馈内容:content,               
             联系方式:getdata.contact,
             图片路径:getdata.imagepath,
             云存储路径:getdata.filepaths,
             },
             success(res){
             console.log("添加至数据库成功",res)
           },
           fail(res){
            console.log("添加失敗",res)
          },
          
        })
        }   
      },
uploadphoto(){
 wx.chooseImage({
   sizeType:["compressed","original"],
   sourceType: ['album'],
   success: (res) => {
    wx.showLoading({
      title:"正在上传......"
    })
     var that=this;
     var photopath=res.tempFilePaths[0];
     wx.cloud.uploadFile({
      cloudPath:"photo/"+Date.now()+".jpg", //时间戳
      filePath:photopath,
      success(res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:"上传成功！",
          duration:2000
        })
        that.setData({
          filepaths:res.fileID
        })
      },
      fail(res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:"上传失败，请检查网络！",
          icon:"none",
          duration:2000
        })
      }
    }) 
     this.setData({
      imagepath:photopath,
     })
   }
 })
},
onShareAppMessage(options){
  return{
    title:"校车反馈测试版",
    path:'pages/relect/relect',
    imageUrl:'http://pic157.nipic.com/file/20180314/1529049_082846921000_2.jpg'
  }
},

jump(){
  wx.navigateToMiniProgram({
    appId: 'wxd947200f82267e58',
    path: 'pages/wjxqList/wjxqList?activityId=75777492',
    extraData: {
      foo: 'bar'
    },
    
    success(res) {
      console.log("jump to WenJuanXing successfully")
      // 打开成功
    }
  })
}
 
})