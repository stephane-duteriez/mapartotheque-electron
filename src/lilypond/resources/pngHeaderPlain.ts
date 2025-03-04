export const pngHeaderPlain = `
\\book {
  \\paper{
	markup-system-spacing.basic-distance = #12
    indent=0\\mm
    line-width=200\\mm
    oddFooterMarkup=##f
    oddHeaderMarkup=##f
    bookTitleMarkup = ##f
    scoreTitleMarkup = ##f
  }
  \\score {
    <<
       \\context Staff="default"
         { \\tune }   
         { \\chords_tune }   
    >>  
    \\layout {}
  }
}
`;