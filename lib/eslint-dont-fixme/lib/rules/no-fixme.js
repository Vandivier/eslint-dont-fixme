module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "disallow FIXME comments and suggest replacing with TODO comments",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [],
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
                // Preserve the comment syntax
                const commentText = comment.value.replace(/FIXME/g, "TODO");
                if (comment.type === "Line") {
                  return fixer.replaceText(comment, `//${commentText}`);
                } else if (comment.type === "Block") {
                  return fixer.replaceText(comment, `/*${commentText}*/`);
                }
              },
            });
          }
        });
      },
    };
  },
};
