
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter()

  const [text, setText] = useState(
    `This project came from a conversation I had with a friend about how to properly use written notes and Google Docs to amplify the thought process and the ways in which the appearance of organization, clarity, and infinite space can deceive and hurt us.

    I’ve recently found myself benefitting dramatically by writing very large documents that expand through all possible thought for a given idea or large decision, yet still, somewhat scared of it. The degree to which writing things in a document in a ‘clean way’ seems to calm my feeling of confusion, ambiguity, or doubt is frightening: is this clarity or only the feeling of it?
    
    There are many times in which sitting down, closing your eyes, and thinking about the problem in your own mind is extremely important. I’ve found myself occasionally going to the Archimedes Banya (of which I would strongly recommend) and sitting for hours in the various steam rooms and pools thinking about important questions. 
    
    While indubitably productive, I found myself frustrated with the amount of “RAM” I had in my head, feeling like I couldn’t process the thoughts that weren’t purely subconscious, finding myself repeating things in my head and attempting to almost auto-regressively process them (and feeling like I was just a big organic language model).
    
    This is an experiment in trying to provide the great benefit of  mental tools like typing out thoughts or sketching on a whiteboard, without offering the often misleading nature of such, whether infinitely branching different ideas without penalty, leaning on visual structure and organization as a substitute for true clarity, or the danger of accidentally only copying down instead of thinking.`
  );
  const [pageState, setPageState] = useState(0);

  const updateState = () => {
    if (pageState == 0) {
      setPageState(1);
      setTimeout(() => {
        setText(
          `To write is to think. It’s the greatest tool we have.

          But it’s easy to slip out of writing to think into thinking to write. This is a writing tool that forces you to think.
          
          Ephemeral is a disappearing notepad: where all of your notes slowly fade over time. 
          
          All words take 30 seconds to fully disappear. If you want to keep something, feel free to write it again - the same way you would call a thought back from memory.
          
          There’s no formatting tools, no bold, no italics, nothing. How much time do we spending obsessing over the way things look, rather than the thinking itself? 
          
          This tool is intended to be used as you are deep in thought and want to boost your working memory, need to sketch something out when you can’t picture it in your head, or need to channel your stream of consciousness.`
        );
        setPageState(2);
      }, 1500); // Adjust timing to match CSS transition
    } else {
      setPageState(1);
      setTimeout(() => {
        router.push("/editor");
      }, 1500); // Adjust timing to match CSS transition
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-12 text-[#6a6a6a]">
      <div className="flex flex-col mt-2 pt-2 max-w-[600px] flex-shrink items-start">
        <div className={`${pageState % 2 == 0 ? "fade-in" : "fade-out"}`}>
          {text.split("\n").map((line, i) => <p className="mb-8" key={i}>{line}</p>)}
          <button onClick={updateState} className={"underline mt-1 text-medium"}>
            {pageState > 1 ? 'Start' : 'Next'} -&gt;
          </button>
        </div>
      </div>
    </div>
  );
};



