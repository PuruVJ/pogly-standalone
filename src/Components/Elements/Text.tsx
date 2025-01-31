import { useContext, useRef } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import Elements from "../../module_bindings/elements";
import TextElement from "../../module_bindings/text_element";
import { TextCreationModal } from "../Modals/TextCreationModal";

interface IProp {
  Tag: string;
  elements: Elements;
}

export const Text = (props: IProp) => {
  const isOverlay: Boolean = window.location.href.includes("/overlay");

  const { setModals } = useContext(ModalContext);

  const CustomTag = props.Tag as keyof JSX.IntrinsicElements;
  const textElement: TextElement = props.elements.element.value as TextElement;

  const targetRef = useRef<HTMLDivElement>(null);

  const showTextCreationModal = () => {
    setModals((oldModals: any) => [
      ...oldModals,
      <TextCreationModal key="textCreation_modal" editElementId={props.elements.id} />,
    ]);
  };

  return (
    <div
      id={props.elements.id.toString()}
      ref={targetRef}
      className="element"
      data-locked={props.elements.locked}
      style={{
        position: "fixed",
        zIndex: props.elements.zIndex,
        color: textElement.color,
        opacity: props.elements.transparency / 100 <= 0.2 && !isOverlay ? 0.2 : props.elements.transparency / 100,
        fontSize: textElement.size,
        transform: props.elements.transform,
        fontFamily: textElement.font,
        backgroundColor: props.elements.transparency / 100 <= 0.2 && !isOverlay ? "rgba(245, 39, 39, 0.8)" : "",
      }}
      onDoubleClick={showTextCreationModal}
    >
      <CustomTag>{textElement.text}</CustomTag>
    </div>
  );
};
