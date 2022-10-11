export default class InlineButtonBuilder {
  constructor(allCallbackData) {
    this.allCallbackData = allCallbackData;
    this.amountOfPages = allCallbackData.length;
  }

  getPaginatedButtons(currentIndex) {
    let paginatedButtonsRow;

    if (this.amountOfPages < 5) {
      paginatedButtonsRow = this.allCallbackData.map((_, i) =>
        this.makePaginatedInlineButton(
          i,
          currentIndex == i ? "current" : "base"
        )
      );
    } else {
      switch (currentIndex) {
        case 0:
        case 1:
        case 2:
          paginatedButtonsRow = [
            this.makePaginatedInlineButton(
              0,
              currentIndex == 0 ? "current" : "base"
            ),
            this.makePaginatedInlineButton(
              1,
              currentIndex == 1 ? "current" : "base"
            ),
            this.makePaginatedInlineButton(
              2,
              currentIndex == 2 ? "current" : "base"
            ),
            this.makePaginatedInlineButton(3, "next"),
            this.makePaginatedInlineButton(this.amountOfPages - 1, "to end"),
          ];
          break;
        case this.amountOfPages - 1:
        case this.amountOfPages - 2:
        case this.amountOfPages - 3:
          paginatedButtonsRow = [
            this.makePaginatedInlineButton(0, "to start"),
            this.makePaginatedInlineButton(this.amountOfPages - 4, "previous"),
            this.makePaginatedInlineButton(
              this.amountOfPages - 3,
              currentIndex == this.amountOfPages - 3 ? "current" : "base"
            ),
            this.makePaginatedInlineButton(
              this.amountOfPages - 2,
              currentIndex == this.amountOfPages - 2 ? "current" : "base"
            ),
            this.makePaginatedInlineButton(
              this.amountOfPages - 1,
              currentIndex == this.amountOfPages - 1 ? "current" : "base"
            ),
          ];
          break;
        default:
          paginatedButtonsRow = [
            this.makePaginatedInlineButton(0, "to start"),
            this.makePaginatedInlineButton(currentIndex - 1, "previous"),
            this.makePaginatedInlineButton(currentIndex, "current"),
            this.makePaginatedInlineButton(currentIndex + 1, "next"),
            this.makePaginatedInlineButton(this.amountOfPages - 1, "to end"),
          ];
      }
    }
    return [paginatedButtonsRow];
  }

  makeBaseInlineButton(text, callback_data) {
    return { text, callback_data };
  }

  makePaginatedInlineButton(index, variant = "base") {
    let text;
    const number = index + 1;

    switch (variant) {
      case "to start":
        text = "« 0";
        break;
      case "to end":
        text = `${this.amountOfPages} »`;
        break;
      case "current":
        text = `- ${number} -`;
        break;
      case "next":
        text = `${number} ›`;
        break;
      case "previous":
        text = `‹ ${number}`;
        break;
      case "base":
      default:
        text = number;
    }

    return this.makeBaseInlineButton(text, this.allCallbackData[index]);
  }
}
