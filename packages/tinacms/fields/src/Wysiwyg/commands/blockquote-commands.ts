import { EditorState } from "prosemirror-state"
import { liftTarget } from "prosemirror-transform"
import { NodeType } from "prosemirror-model"

export function liftBlockquote(state: EditorState, dispatch: Function) {
  let range = getRangeForType(state, state.schema.nodes.blockquote)
  if (!range) return false

  let target = liftTarget(range)
  if (!target) return false

  if (dispatch) {
    dispatch(state.tr.lift(range, target)) //dont lift lists
  }
  return true
}

const getRangeForType = (state: EditorState, listType: NodeType) => {
  let { $from, $to } = state.selection
  let range = $from.blockRange($to, node => {
    return node.type == listType
  })
  return range
}