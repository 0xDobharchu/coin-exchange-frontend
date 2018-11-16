import React from 'react';
import './styles.scss';
import Collapse from '@/components/Collapse';

class Faq extends React.PureComponent {
  componentDidMount() {

  }

  render() {
    const {
      faq
    } = this.props;

    console.log('faq',faq);

    return (
      <div>
        { faq && (
          <div className="row mt-5" id="faq" ref={(c) => { this.faq = c; }}>
            <div className="col">
              <div>
                {faq.map((item) => {
                  const { question, answer, order } = item;
                  return (
                    <Collapse
                      label={question}
                      content={answer}
                      isList={item.isList}
                      theme="white"
                      key={order}
                      index={order}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )
        }
      </div>
    );
  }
}

export default Faq;
