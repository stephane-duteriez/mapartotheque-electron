export const bookHeader = `
\\paper {
  #(set-paper-size "a5")
  system-system-spacing #'basic-distance = #8
  score-system-spacing =
    #'((basic-distance . 12)
       (minimum-distance . 6)
       (padding . 1)
       (stretchability . 12))
    page-breaking = #ly:page-turn-breaking
  tocActMarkup = \\markup \\large \\column {
    \\hspace #1
    \\fill-line { \\null \\italic \\fromproperty #'toc:text \\null }
    \\hspace #1
  }
print-all-headers = ##t
}
\\layout {
    \\context {
      \Score
      \override NonMusicalPaperColumn.page-break-permission = ##f
    }
  }
tocAct =
#(define-music-function (parser location text) (markup?)
   (add-toc-item! 'tocActMarkup text))

\\markuplist \\table-of-contents
\\pageBreak
`;
