module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "disallow FIXME comments and suggest replacing with TODO comments",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code", // Or "whitespace" if the fixer changes only whitespace
    schema: [], // no options
  },
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      Program() {
        const comments = sourceCode.getAllComments();
        comments.forEach((comment) => {
          if (/FIXME/.test(comment.value)) {
            context.report({
              node: comment,
              message: "Replace FIXME with TODO for code consistency.",
              fix(fixer) {
                return fixer.replaceText(
                  comment,
                  comment.value.replace(/FIXME/g, "TODO")
                );
              },
            });
          }
        });
      },
    };
  },
};
