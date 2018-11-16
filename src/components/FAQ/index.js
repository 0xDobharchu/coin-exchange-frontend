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
                {faq.map((item, index) => (
                  <Collapse
                    label={item.question}
                    content={item.answer}
                    isList={item.isList}
                    theme="white"
                    key={item.question}
                    index={index + 1}
                  />
                ))}
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
