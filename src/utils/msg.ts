import { ElNotification, ElMessageBox, ElMessage, ElLoadingService } from 'element-plus'

const Msg : any = {
  $message: ElMessage,
  $messageAddSuccess: () => ElMessage.success('新增成功'),
  $messageEditSuccess: () => ElMessage.success('修改成功'),
  $messageDeleteSuccess: () => ElMessage.success('刪除成功'),
  $notify: ElNotification,
  $msgbox: ElMessageBox,
  $alert: ElMessageBox.alert,
  $confirm: ElMessageBox.confirm,
  $prompt: ElMessageBox.prompt,
  $loading: ElLoadingService,
}

export default Msg
