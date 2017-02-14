<template>
  <div class="ui segment">
    <div v-show="loading" class="ui large active loader">
      <div class="ui text loader">上传图片中</div>
    </div>
    <upload-file :upload_url="upload_url" @change_file="previewImg" accept="image/*" @upload_done="done_call_back" class="hide">上传附件2</upload-file>
    <a @click="changeImg" href="javascript:void(0)" data-content="点击更换头像" >
      <div class="upload position">
        <img :src="img_src" class="ui medium image" />
        <a href=""><img class="delete" src="./assets/delete.svg"></a>
      </div>
    </a>
    
  </div>
</template>

<script>
  import upload_picture from './assets/upload-picture.svg'
  import UploadFile from 'bz-upload-file'
  import $ from 'jquery'
  export default {
    props: {
      upload_url: {
        type: String,
        default: '/api_file_upload'
      },
      img_src: {
        type: String,
        default: upload_picture
      },
      change_img: { // 完成上传后，有的还是要显示原先的预览图
        type: Boolean,
        default: true
      }
    },
    components: {
      UploadFile
    },
    data: function () {
      return {
        loading: false,
        img_input: null,
        pre_img: null
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.img_input = $(this.$el).find('input')
        this.pre_img = $(this.$el).find('img')
      })
    },
    methods: {
      changeImg: function () {
        return this.img_input.click()
      },
      previewImg: function (e) {
        this.loading = true
        let _this = this
        var file, reader
        file = e.target.files[0]
        if (!file) {
          return
        }
        if (file.size > (10 * 1024 * 1024)) {
          throw new Error('图片大小只能小于10m哦~')
        }
        reader = new window.FileReader()
        reader.onload = function (e) {
          _this.pre_img.attr('src', e.target.result)
        }
        reader.readAsDataURL(file)
      },
      done_call_back: function (file_path) {
        if (this.change_img) {
          this.pre_img.attr('src', file_path)
        } else {
          this.pre_img.attr('src', this.img_src)
        }
        this.loading = false
        this.$emit('upload_done', file_path)
      }
    },
    computed: {
    }
  }
</script>

<style>
  .hide {
    display: none!important;
  }
  .delete {
    position: absolute;
    top: -0.8rem;
    right: -0.8rem;
  }
  .position {
    position: relative;
  }
  .upload {
    margin-left: 40%;
    margin-right: 40%;
    width: 20%;
    display: inline-block;
  }
</style>
