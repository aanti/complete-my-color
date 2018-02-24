export const fetchStatus = {
  initial: {
    fetching: false,
    success: false,
    error: false
  },
  fetching: {
    fetching: true,
    success: false,
    error: false
  },
  success: {
    fetching: false,
    success: true,
    error: false
  },
  error: {
    fetching: false,
    success: false,
    error: true
  }
}

export default {
  ui: {
    backgroundColor: '6f6f6f'
  },
  data: {
    dataset: [],
    status: fetchStatus.initial
  },
  autocomplete: {
    text: '',
    hovered: -1,
    chosen: null,
    focused: false
  }
}
