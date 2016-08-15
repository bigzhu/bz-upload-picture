<style lang=less>
  .hide{
    display: none
  }
</style>

<template>
  <div class="ui segment">
    <div v-show="loading" class="ui active inverted dimmer">
      <div class="ui text loader">上传图片中</div>
    </div>
    <input class="hide image input" type="file" @change="previewImg" accept="image/*"/>
    <a @click="changeImg" href="javascript:void(0)" data-content="点击更换头像">
      <img :src="img_src" id="profile-image" class="ui medium centered image" />
    </a>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import $ from 'jquery'
  export default {
    props: {
      img_src: {
        type: String,
        default: '/static/logo.svg'
      },
      call_back: {
        type: Function
      },
      upload_url: {
        type: String,
        default: '/api_file_upload'
      }
    },
    components: {
    },
    data: function () {
      return {
        loading: false,
        img_input: null,
        pre_img: null
      }
    },
    ready () {
      this.img_input = $(this.$el).find('input')
      this.pre_img = $(this.$el).find('img')
    },
    methods: {
      changeImg: function () {
        return this.img_input.click()
      },
      previewImg: function (e) {
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
          return _this.img_input.attr('src', e.target.result)
        }
        reader.readAsDataURL(file)
        return this.uploadImage()
      },
      uploadImage: function () {
        this.loading = true
        var fd, file
        fd = new window.FormData()
        file = this.img_input[0].files[0]
        if (file) {
          fd.append('img', file)
          return $.ajax(
            {
              url: this.upload_url,
              type: 'POST',
              data: fd,
              processData: false,
              contentType: false,
              success: (
                function (_this) {
                  return function (data, status, response) {
                    _this.loading = false
                    if (!data.success) {
                      throw new Error(data.msg)
                    } else {
                      toastr.info('保存成功')
                      _this.img_src = data.file_path
                      if (_this.call_back) {
                        _this.call_back(data.file_path)
                      }
                    }
                  }
                }
              )(this),
              error: function (error_info) {
                this.loading = false
                toastr.error(error_info)
                // throw new Error(error_info)
              }
            }
          )
        }
      }
    },
    computed: {
    }
  }
</script>
