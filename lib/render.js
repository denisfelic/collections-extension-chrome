import { Collections } from "./Collections.js";
import { events } from "./events.js";

export function updateDOM() {
    Collections.renderCollectionList();
    events.loadsClickableOnCollectionEvent();
    events.createNewCollection();
    events.modalBackButtonEvent();
  }