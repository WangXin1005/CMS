/**
 * 表格高度统一管理
 * 使用 flex column 填满内容区 + ResizeObserver 测量容器高度
 */
export const useTableHeight = () => {
  const wrapperRef = ref<HTMLElement>()
  const tableHeight = ref<number>(400)

  onMounted(() => {
    const el = wrapperRef.value
    if (!el) return
    // requestAnimationFrame 确保布局完成后再读取高度
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const h = el.clientHeight
        if (h > 0) tableHeight.value = h
      })
    })
    const ro = new ResizeObserver(() => {
      const h = el.clientHeight
      if (h > 0) tableHeight.value = h
    })
    ro.observe(el)
    onUnmounted(() => ro.disconnect())
  })

  return { wrapperRef, tableHeight }
}
