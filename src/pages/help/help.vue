<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { ref, reactive, inject } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { axiosType } from '@/plugins/dataType';

const axios = inject('axios') as axiosType;
const helpName = ref('common');
const helpColl = ref(0);
const help = reactive({
  list: [] as any,
  pageNum: {
    page: 1,
    limit: 10,
    total: 1
  }
});
const helpParams = {
  page: 1,
  limit: 10,
  search: '',
  where: {
    is_common: true
  } as any
};

const handleHelpList = async (params: any) => {
  const res = await axios.post('/help_release', params, 'backservices');
  console.log(res);
  if (res.code === 0) {
    if (res.data.rets) {
      help.list = res.data.rets;
    }
    help.pageNum.page = res.data.page;
    help.pageNum.total = res.data.total;
    help.pageNum.limit = res.data.limit;
  }
};
handleHelpList(helpParams);
const handleTabsHelp = (tab: TabsPaneContext) => {
  helpParams.page = 1;
  const { name } = tab.props;
  if (name === 'common') {
    helpParams.where = {
      is_common: true
    };
  } else {
    helpParams.where = {};
  }
  handleHelpList(helpParams);
  helpColl.value = 0;
};
const handleCollapse = (id: any) => {
  console.log(id);
};
const handleChangePage = (page: number) => {
  console.log(page);
  helpParams.page = page;
  helpColl.value = 0;
  handleHelpList(helpParams);
};
</script>
<template>
  <div class="bg-basic-box rounded form-box">
    <div v-if="help.list.length" class="p-20px">
      <el-tabs v-model="helpName" @tab-click="handleTabsHelp">
        <el-tab-pane :label="$t('help.common')" name="common">
          <div class="collapse-box collapse-help p-20px">
            <el-collapse v-model="helpColl" accordion @change="handleCollapse">
              <el-collapse-item
                v-for="item in help.list"
                :key="item.id"
                :name="item.id"
              >
                <template #title>
                  <div class="w-full flex items-center">
                    <div class="w-2/5 truncate">
                      <span>{{ $t('help.directory') }}:</span>
                      <el-tooltip
                        effect="dark"
                        :content="item.title"
                        placement="bottom"
                      >
                        <span>{{ item.title }}</span>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <template v-if="item.children">
                  <router-link
                    v-for="ele in item.children"
                    :key="ele.id"
                    :to="{ name: 'HelpDetails', params: { id: item.id } }"
                    class="flex h-10 leading-10 px-3 hover:text-blue"
                  >
                    <span>{{ ele.title }}</span>
                  </router-link>
                </template>
                <div
                  v-else
                  class="w-full bg-basic-box rounded-3xl p-10 flex justify-center"
                >
                  <img src="@/assets/image/no-data.png" alt="no-data" />
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('user.all')" name="all">
          <div class="collapse-box collapse-help p-20px">
            <el-collapse v-model="helpColl" accordion @change="handleCollapse">
              <el-collapse-item
                v-for="item in help.list"
                :key="item.id"
                :name="item.id"
              >
                <template #title>
                  <div class="w-full flex items-center">
                    <div class="w-2/5 truncate">
                      <span>{{ $t('help.directory') }}:</span>
                      <el-tooltip
                        effect="dark"
                        :content="item.title"
                        placement="bottom"
                      >
                        <span>{{ item.title }}</span>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
                <template v-if="item.children">
                  <router-link
                    v-for="ele in item.children"
                    :key="ele.id"
                    :to="{ name: 'HelpDetails', params: { id: item.id } }"
                    class="flex h-10 leading-10 px-3 hover:text-blue"
                  >
                    <span>{{ ele.title }}</span>
                  </router-link>
                </template>
                <div
                  v-else
                  class="w-full bg-basic-box rounded-3xl p-10 flex justify-center"
                >
                  <img src="@/assets/image/no-data.png" alt="no-data" />
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="page-box w-full flex justify-center mb-20px">
        <el-pagination
          small
          background
          hide-on-single-page
          layout="prev, pager, next"
          :pager-count="11"
          :current-page="Number(help.pageNum.page)"
          :page-size="Number(help.pageNum.limit)"
          :total="Number(help.pageNum.total)"
          @current-change="handleChangePage"
        ></el-pagination>
      </div>
    </div>
    <div
      v-else
      class="w-full bg-basic-box rounded-3xl p-20 flex justify-center"
    >
      <img src="@/assets/image/no-data.png" alt="no-data" />
    </div>
  </div>
</template>
