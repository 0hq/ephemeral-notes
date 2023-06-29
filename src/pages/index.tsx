import { CompositeDecorator, ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';


const timeout = 60000

const initialContent = ContentState.createFromText("Just like your thoughts, your notes here don't stick around forever...");

function FadingSpan(props: any) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  const style = {
    animation: visible ? `fadeOut ${timeout / 1000}s forwards` : '',
    display: visible ? 'inline' : 'none'
  };

  return <span style={style}>{props.children}</span>;
}

const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      const text = contentBlock.getText();
      for (let i = 0; i < text.length; i++) {
        callback(i, i + 1);
      }
    },
    component: FadingSpan,
  },
]);


export default function Home() {
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(initialContent, decorator));

  const handleEditorChange = (newEditorState: any) => {
    setEditorState(EditorState.set(newEditorState, { decorator }));
  };

  return (
    <div className="flex flex-col items-center justify-between p-24 h-screen">
      <div className="flex flex-col mt-2 pt-2 w-[600px] h-full items-start">
        <p className='text-black opacity-60 mb-2.5 font-semibold'>Ephemeral Notes</p>
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
}
