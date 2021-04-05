<!--
 * @Author: abc
 * @Date: 2021-03-02 15:57:52
 * @LastEditors: abc
 * @LastEditTime: 2021-04-02 09:48:37
 * @Description: first ecology wallet
-->
<template>
  <el-dialog
    v-loading="uploadLoading"
    :visible.sync="dialogUpload"
    width="30%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    element-loading-text="Loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h3 slot="title">{{ $t('user.modifyprofile') }}</h3>
    <div class="warp-dialog">
      <el-form
        :model="profileForm"
        status-icon
        :rules="rules"
        ref="uploadForm"
        label-width="100px"
      >
        <el-form-item label-width="0" ref="file">
          <div class="warp-dialog-upload">
            <!-- <span class="warp-dialog-text">{{ $t('user.avatar') }}:</span> -->
            <el-upload
              v-loading="uploading"
              class="warp-dialog-upload-box"
              action="#"
              :http-request="handleUploadName"
              :show-file-list="false"
              :before-upload="handleBeforeAvatar"
            >
              <img
                :src="preImageUrl || userInfo.avatar"
                alt="head"
                class="warp-dialog-upload-img"
                v-if="userInfo.avatar || preImageUrl"
              />
              <img
                src="@/assets/image/profile.png"
                alt="head"
                class="warp-dialog-upload-img"
                v-else
              />
            </el-upload>
          </div>
        </el-form-item>
        <p class="warp-dialog-upload-text">
          {{ $t('zzzPictureSize500') }}
        </p>
        <!--  <p style="color: red; font-size: 12px">
        {{ $t('zzzPictureEmpty') }}
      </p> -->
        <el-form-item
          :label="$t('user.nickname')"
          prop="nickname"
          class="warp-dialog-nickname"
        >
          <el-input
            v-if="userInfo.member_name"
            class="warp-top-nickname"
            :placeholder="$t('PleaseNickname')"
            type="text"
            :disabled="userInfo.member_name !== ''"
            v-model="userInfo.member_name"
          />
          <el-input
            v-else
            class="warp-top-nickname"
            :placeholder="$t('PleaseNickname')"
            type="text"
            v-model="profileForm.nickname"
          />
          <el-popover
            placement="top"
            :title="$t('user.nicknameruletitle')"
            width="440"
            trigger="hover"
            :close-delay="10"
            class="warp-top-poover"
          >
            <div class="warp-top-poover-box">
              <el-scrollbar style="height: 100%">
                <div
                  v-html="$t('user.nicknamerule')"
                  class="warp-top-poover-content"
                ></div>
              </el-scrollbar>
            </div>
            <a
              slot="reference"
              style="color: #666"
              class="el-icon-question"
            ></a>
          </el-popover>
        </el-form-item>
        <el-form-item
          class="warp-dialog-cost"
          label=""
          v-if="EditNicknameFee && !$store.state.userInfo.member_name"
        >
          <span> {{ $t('user.modifyfee') }}：{{ EditNicknameFee }}</span>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="handleUploadCancel('uploadForm')"
        :disabled="uploading"
      >
        {{ $t('cancel') }}</el-button
      >
      <el-button
        type="primary"
        @click="handleUploadSubmit('uploadForm')"
        :disabled="uploading"
        >{{ $t('confirm') }}</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogUpload: {
      type: Boolean,
      default: () => false
    },
    imgids: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    var checkNickName = (rule, value, callback) => {
      this.handleChangeNickName(value);
      if (!value) {
        return callback(new Error(this.$t('zzzNicknameNotEmpty')));
      }
      // Number letter underline
      const regNickName = /^[\w]{1,20}$/;
      if (!regNickName.test(value)) {
        callback(new Error(this.$t('zzzNicknameNotRules')));
      } else {
        callback();
      }
    };
    return {
      uploading: false,
      uploadLoading: false,
      EditNicknameFee: false,
      newFile: '',
      preImageUrl: '',
      booSubmit: false,
      profileForm: {
        ImageId: '',
        nickname: ''
      },
      rules: {
        ImageId: [{ require: false, message: this.$t('zzzPictureEmpty') }],
        nickname: [{ validator: checkNickName, trigger: 'blur' }]
      }
    };
  },
  computed: {
    userInfo() {
      //  console.log(this.$store.getters.handleGettersUserInfo);
      return this.$store.getters.handleGettersUserInfo;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChangeNickName(value) {
      const regNickName = /^[\w]{1,20}$/;
      if (regNickName.test(value)) {
        const len = value.length;
        if (len <= 3 && len > 0) {
          this.EditNicknameFee = '10,000 IBXC';
        } else if (len == 4) {
          this.EditNicknameFee = '5,000 IBXC';
          this.shouname = false;
        } else if (len == 5) {
          this.EditNicknameFee = '1,000 IBXC';
        } else {
          this.EditNicknameFee = '';
        }
      } else {
        this.EditNicknameFee = '';
      }
    },
    handleBeforeAvatar(file) {
      const that = this;
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension =
        testmsg === 'jpg' ||
        testmsg === 'JPG' ||
        testmsg === 'png' ||
        testmsg === 'PNG' ||
        testmsg === 'jpeg' ||
        testmsg === 'JPEG';
      const isLt50M = file.size / 1024 / 1024 < 0.5;
      if (!extension) {
        this.$message({
          message: this.$t('zzzUploadImageFormatss'),
          type: 'error'
        });
        return false;
      }
      if (!isLt50M) {
        this.$message.error(this.$t('zzzPictureSize500'));
        return false;
      }
      this.uploading = true;
      this.util.transfile(file, 'FileData', (FileData) => {
        this.auth.callContract(
          'BufferFileUpload',
          { AppId: '3', FileData, BufferKey: 'avatar', FileName: '' },
          {
            Expedite: '' //
          },
          (res, status) => {
            if (status === 'error') {
              this.$message.error(res.errmsg.error);
            } else if (status === 'loading') {
              this.$message.success(this.$t('table.chain'));
            } else if (status === 'success') {
              this.$message.success(that.$t('contract.tx_batch'));
            }
            this.handleBufferData(file, FileData);
            this.uploading = false;
          }
        );
      });
    },
    async handleBufferData(file, FileData) {
      this.preImageUrl =
        'data:' +
        file.type +
        ';base64,' +
        this.util.transformArrayBufferToBase64(FileData.value);
      // this.$store.commit('getuser');
      const objParams = {
        limit: 1,
        offset: 0,
        order: '',
        where: {
          account: this.auth.getUser('account'),
          ecosystem: this.auth.getUser('ecosystem_id'),
          key: 'avatar'
        }
      };
      // const objQs = qs.stringify(objParams);
      const res = await this.$http.post(`/listWhere/buffer_data`, null, {
        params: objParams
        //  interType: 'nodeserver'
      });
      console.log(res);
      var data = JSON.parse(res.list[0].value);
      console.log(data.binary_id);
      localStorage.setItem('ImageId', data.binary_id);
      this.profileForm.ImageId = data.binary_id;
      //this.$parent.handleEcologyKey();
      this.$store.dispatch('handleActionEcology');
    },
    handleUploadName() {},
    handleClose() {
      this.preImageUrl = '';
      this.profileForm = {
        ImageId: '',
        nickname: ''
      };
      this.$parent.dialogUpload = false;
    },
    handleUploadCancel(formName) {
      this.preImageUrl = '';
      this.profileForm = {
        ImageId: '',
        nickname: ''
      };
      this.$store.dispatch('handleActionEcology');
      this.$refs[formName].resetFields();
      this.$parent.dialogUpload = false;
    },
    handleUploadSubmit(formName) {
      const that = this;
      if (!this.profileForm.ImageId) {
        that.$message.error(this.$t('zzzPictureEmpty'));
        return false;
      }
      let id = localStorage.getItem('ImageId');
      //  let img = this.auth.getUser('avatar');
      let imgids = '';
      if (!id) {
        console.log(123);
        imgids = this.imgid;
      } else {
        console.log(456);
        imgids = id;
      }
      if (this.userInfo.member_name) {
        this.profileForm.nickname = this.userInfo.member_name;
      }
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        console.log(this.profileForm);
        if (valid) {
          this.uploadLoading = true;
          this.auth.callContract(
            'ProfileEdit',
            {
              Name: this.profileForm.nickname,
              Info: 'xx',
              ImageId: imgids
            },
            {
              Expedite: '' //
            },
            (res, status) => {
              if (status === 'error') {
                this.$message.error(res.errmsg.error);
              } else if (status === 'loading') {
                this.$message.success(this.$t('table.chain'));
              } else if (status === 'success') {
                that.$message.success(that.$t('contract.tx_batch'));
              }
              this.$store.dispatch('handleActionEcology');
              this.$parent.dialogUpload = false;
              this.profileForm = {
                ImageId: '',
                nickname: ''
              };
              this.uploadLoading = false;
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
