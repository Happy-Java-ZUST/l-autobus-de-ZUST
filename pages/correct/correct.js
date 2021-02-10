//暂存markers
const markers=[];

const CB = wx.cloud.database().collection("reactData");
Page({
  data:{
  latitude:'',
  longitude:'',
  markers:[],
  num:0,
  points:[],
  polyline:[],
  //content:" ",
  inputvalue:null,
  //records:[]
  },

 onLoad(){

  wx.getLocation({
    type:'gcj02',
    success:(res)=> {
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
       })
     },
     fail(res){
       console.error(res);
       
     }
   })
   //每3秒踩点一次
   setInterval(
     this.getPoint,3000
     )
  },
  getPoint(){
    wx.getLocation({
      type:'gcj02',
      success:(res)=> {
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        })
      },
      fail(res){
         console.error(res);
         
        }
      })
      
      //获取当前位置并存储到polyline
      this.data.points.push({
        latitude:this.data.latitude,
        longitude:this.data.longitude
      })
   // console.log(this.data.points)
   this.setData({
     polyline:[{
       points: this.data.points,
       color: "#0091ff",
       width: 3,
      }],
      
    })
    
  },
  addPosition(){
    //this.onLoad();
    wx.getLocation({
      type:'gcj02',
      success:(res)=> {
        var num=this.data.num
        this.setData({
          num:num+1,
        })
        markers.push({
          latitude:res.latitude,
          longitude:res.longitude,
          id:num,
          width:40,
          height:40,
          label:{
            content:num+1,
            display:'ALWAYS',
            borderRadius:15,
            fontSize:15,
            padding:2,
            anchorX:-20,
            anchorY:-40,
            textAlign:"center"
          }
        })
        this.setData({
          markers:markers
        })
        console.log(this.data.polyline)
        
       },
       fail(res){
         console.error(res);
         
       }
     })
    
  },
 /* Record(e){
    this.data.content=e.detail.value;
    console.log(e)
  
    //console.log(e.detail.value);
  },
/*  records(){
    var data=this.data;
    data.records.push(this.data.content)
    console.log(data.records)
  },
 /* getData(){
    
   /* CB.add({
      data:{
         经度:data.latitude,
         纬度:data.longitude,
         地点:data.content
         },
         success(res){
           
         console.log("添加至数据库成功",res)
       },
       fail(res){
        console.log("添加失敗",res)
      }
    },
    DelData(res){
      const that=this;
      that.data.records.splice(that.data.records.findIndex( index => index === res.currentTarget.dataset.id), 1)
      that.setData({
        'inputvalue':'',
        records: that.data.records
      })
      console.log(that.data.records)
    })*/
  /*  CB.doc("_id").remove({
      success: function() {
      console.log("删除数据成功")
    },
    fail(){
      console.log("删除失败")
      
    })
    
    
  }
}*/
  
})