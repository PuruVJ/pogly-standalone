import { useEffect } from "react";
import ElementData from "../../module_bindings/element_data";
import { addElementData, removeElementData, updateElementData } from "../../Store/Features/ElementDataSlice";
import { useAppDispatch } from "../../Store/Features/store";
import { CanvasInitializedType } from "../../Types/General/CanvasInitializedType";
import { WidgetCodeCompiler } from "../../Utility/WidgetCodeCompiler";

export const useElementDataEvents = (canvasInitialized: CanvasInitializedType, setCanvasInitialized: Function) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (canvasInitialized.elementDataEventsInitialized) return;

    ElementData.onInsert((element, reducerEvent) => {
      if (!reducerEvent) return;

      dispatch(addElementData(element));
    });

    ElementData.onUpdate((oldData, newData, reducerEvent) => {
      // UPDATE WIDGET NAME
      if (oldData.name !== newData.name) {
        const widgetButton = document.querySelectorAll(`[data-widget-selection-button='${oldData.id.toString()}']`)[0];

        widgetButton.innerHTML = newData.name;
      }

      // UPDATE DATA
      if (oldData.data !== newData.data) {
        const widgetsWithData = document.querySelectorAll(`[data-widget-element-data-id='${oldData.id.toString()}']`);

        const htmlTag = WidgetCodeCompiler(undefined, newData.data);

        widgetsWithData.forEach((widget: any) => {
          widget.src = "data:text/html;charset=utf-8," + encodeURIComponent(htmlTag);
        });
      }

      dispatch(updateElementData(newData));
    });

    ElementData.onDelete((element, reducerEvent) => {
      if (!reducerEvent) return;

      dispatch(removeElementData(element));
    });

    setCanvasInitialized((init: CanvasInitializedType) => ({ ...init, elementDataEventsInitialized: true }));
  }, [canvasInitialized.elementDataEventsInitialized, setCanvasInitialized, dispatch]);
};
