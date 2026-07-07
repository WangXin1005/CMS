/**
 * 表格高度统一管理（支持分页器偏移）
 * 使用 flex column 填满内容区 + ResizeObserver 测量容器高度
 * @param offset 为分页器预留的高度偏移量（默认 0，懒加载页面传 0）
 */
export const useTableHeight = (offset: number = 0) => {
  const wrapperRef = ref<HTMLElement>()
  const tableHeight = ref<number>(400)

  onMounted(() => {
    const el = wrapperRef.value
    if (!el) return
    // requestAnimationFrame 确保布局完成后再读取高度
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const h = el.clientHeight
        if (h > 0) tableHeight.value = Math.max(h - offset, 200)
      })
    })
    const ro = new ResizeObserver(() => {
      const h = el.clientHeight
      if (h > 0) tableHeight.value = Math.max(h - offset, 200)
    })
    ro.observe(el)
    onUnmounted(() => ro.disconnect())
  })

  return { wrapperRef, tableHeight }
}
