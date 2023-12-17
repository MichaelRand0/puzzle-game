import useModal from "@/src/hooks/modal"
import React from "react"
import ModalIntro from "./ModalIntro"
import ModalFinal from "./ModalFinal"
import ModalPhoto from "./modalPhoto"

interface Props {
  imgRef:any
}

const Modal = (props: Props) => {
  const {imgRef} = props
  const { modalType, setModalType } = useModal()
  return modalType === null ? (
    ""
  ) : (
    <div
      onClick={() => modalType === 'photo' ? null : setModalType(null)}
      className="absolute top-0 left-0 z-50 w-full h-full bg-black/70 flex items-center justify-center"
    >
      <div onClick={e => e.stopPropagation()} className="rounded-[60px] w-[513px] h-[390px] px-[30px] py-[40px] relative shadow-ilex-shadow bg-ilex-gradient">
        {modalType === "final" ? <ModalIntro /> : ""}
        {modalType === "intro" ? <ModalFinal /> : ""}
        {modalType === "photo" ? <ModalPhoto imgRef={imgRef} /> : ""}
      </div>
    </div>
  )
}

export default Modal
