import { CompositeDecorator, DefaultDraftBlockRenderMap, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Map as ImmutableMap } from 'immutable';
import { useEffect, useState } from 'react';

const timeout = 5000

const FadingBlock = (props: any) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  const style = {
    transition: visible ? '' : `opacity ${timeout / 1000}s forwards, height ${timeout / 1000}s forwards`,
    // opacity: visible ? 1 : 0,
    // height: visible ? 'auto' : '0',
    overflow: 'hidden'
  };

  return <div style={style}>{props.children}</div>;
};

const blockRenderMap = ImmutableMap({
  'unstyled': {
    element: 'div',
    wrapper: <FadingBlock />,
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


function FadingSpan(props: any) {
  const [style, setStyle] = useState<any>({
    display: 'inline-block',
    transition: `opacity ${timeout / 1000}s, textSize ${timeout / 1000}s`,
    textSize: 'auto',  // Start at normal height
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start shrinking and fading after timeout
      setStyle({
        ...style,
        opacity: 0,
        textSize: 0,
      });
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

  return <span style={style}>{props.children}</span>;
}


const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      const text = contentBlock.getText();
      // for (let i = 0; i < text.length; i++) {
      //   callback(i, i + 1);
      // }
      callback(0, text.length);
    },
    component: FadingSpan,
  },
]);

export default function Home() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

  const handleEditorChange = (newEditorState: any) => {
    setEditorState(EditorState.set(newEditorState, { decorator }));
  };

  return (
    <div className="flex flex-col items-center justify-between p-24 h-screen">
      <div className="flex flex-col mt-2 pt-2 w-[600px] h-full items-start">
        <p className='text-black opacity-60 mb-2.5 font-semibold'>Ephemeral Notes</p>
        <Editor editorState={editorState} onChange={handleEditorChange} placeholder="Just like your thoughts, your notes here don't stick around forever..." blockRenderMap={extendedBlockRenderMap} />
      </div>
    </div>
  );
}
