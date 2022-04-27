const FormDataAppend = (Obj) => {
    const appendedForm = new FormData()
    Object.entries(Obj)?.forEach(([key, value]) => {
        if (typeof value === null || typeof value === undefined) return
        if (typeof value === "object") {
            if (value?.value !== undefined) {
                return appendedForm.append(key, value.value)
            }
            if (value?.length) {
                if (value[0]?.value) {
                    return appendedForm.append(key, value.map(v => v.value).toString())
                }
                return null
            }
            return appendedForm.append(key, value)
        }
        if (value) {
            return appendedForm.append(key, value)
        }
    })
    return appendedForm
}

export default FormDataAppend