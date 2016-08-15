<style lang=less>
  .hide{
    display: none
  }
</style>

<template>
  <div>
    <input class="hide image input" type="file" @change="previewImg" accept="image/*"/>
    <a @click="changeImg" href="javascript:void(0)" data-content="点击更换头像">
      <img :src="img_src" id="profile-image" class="ui medium bordered centered image" />
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
      }

    },
    components: {
    },
    data: function () {
      return {
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
        var fd, file
        fd = new window.FormData()
        file = this.img_input[0].files[0]
        if (file) {
          fd.append('img', file)
          return $.ajax(
            {
              url: '/api_file_upload',
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
                      return _this.pre_img.attr('src', data.file_path)
                    }
                  }
                }
              )(this),
              error: function (error_info) {
                this.loading = false
                throw new Error(error_info)
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
