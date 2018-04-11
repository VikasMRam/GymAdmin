import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools'
import numeral from 'numeral';

import { Heading, Bar, Block, Box, Button } from 'sly/components/atoms';
import { RoomTile } from 'sly/components/molecules';
import { size } from 'sly/components/themes';

const Item = styled.div`
  display: inline-block;
  margin-bottom: ${size('spacing.large')};
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
    margin-right: ${size('spacing.large')};
    width: auto;
  }
`;
const ItemDescription = styled.div`
  padding: ${size('spacing.large')};
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  flex-direction: ${ifProp('breakOnSmallScreen', 'column', 'initial')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: initial;
  }
`;
const SmallScreenMarginTopWrapper = styled.div`
    margin-top: ${size('spacing.large')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
        margin-top: 0;
    }
`;
const LocalitiesWrapper = styled.div`
  width: 95%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 70%;
  }
  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    width: 50%;
  }
`;
const SpacingTopRegularWrapper = styled.div`
  margin-top: ${size('spacing.regular')};
`;
const PriceWrapper = styled.span`
  margin-left: ${size('spacing.regular')};
`;

export default class PricingAndAvailability extends Component {
    static propTypes = {
        communityName: PropTypes.string.isRequired,
        sharedRoom: PropTypes.shape({
            price: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
        }),
        privateRoom: PropTypes.shape({
            price: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
        }),
        oneBedRoom: PropTypes.shape({
            price: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
        }),
        priceComparison: PropTypes.arrayOf(PropTypes.shape({
            locality: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })),
        estimatedCost: PropTypes.shape({
            from: PropTypes.number.isRequired,
            to: PropTypes.number.isRequired,
        }),
        onGetDetailedPricingClicked: PropTypes.func,
        onInquireOrBookClicked: PropTypes.func,
    };

    findPercentage(price, maxPrice) {
        return (price/maxPrice) * 100;
    }

    render() {
        const {
            communityName,
            sharedRoom,
            privateRoom,
            oneBedRoom,
            priceComparison,
            estimatedCost,
            onGetDetailedPricingClicked,
            onInquireOrBookClicked,
            ...props
        } = this.props;
        if (priceComparison) {
            priceComparison.sort((a, b) => a.price - b.price);
            this.maxPrice = priceComparison[priceComparison.length - 1].price;
        }

        return (
            <section id="pricing-and-floor-plans">
                <article>
                    {estimatedCost &&
                        <Box>
                            <TwoColumnWrapper breakOnSmallScreen={true}>
                                <div>
                                    Estimated cost from ${numeral(estimatedCost.from).format('0,0')} to ${numeral(estimatedCost.to).format('0,0')} per month*
                                    <SpacingTopRegularWrapper>
                                        <Block size="caption">
                                            *Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area, and the amenities and care services provided at {communityName}.
                                        </Block>
                                    </SpacingTopRegularWrapper>
                                </div>
                                <SmallScreenMarginTopWrapper>
                                    <Button onClick={onGetDetailedPricingClicked}>Get Detailed Pricing</Button>
                                </SmallScreenMarginTopWrapper>
                            </TwoColumnWrapper>
                        </Box>
                    }
                    {!estimatedCost && sharedRoom &&
                        <Item>
                            <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} img={sharedRoom.img} price={sharedRoom.price} type="shared" />
                        </Item>
                    }
                    {!estimatedCost && privateRoom &&
                        <Item>
                            <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} img={privateRoom.img} price={privateRoom.price} type="private" />
                        </Item>
                    }
                    {!estimatedCost && oneBedRoom &&
                        <Item>
                            <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} img={oneBedRoom.img} price={oneBedRoom.price} type="1bedroom" />
                        </Item>
                    }
                </article>
                {priceComparison &&
                    <article>
                        <Heading size="subtitle">Compare to Local Assisted Living Costs</Heading>
                        <LocalitiesWrapper>
                            {priceComparison.map((object, i) => {
                                return <SpacingTopRegularWrapper key={i}>
                                    {object.locality}
                                    <TwoColumnWrapper>
                                        <Bar width={this.findPercentage(object.price, this.maxPrice) + '%'} />
                                        <PriceWrapper>
                                            <Block size="caption">
                                                ${numeral(object.price).format('0,0')}
                                            </Block>
                                        </PriceWrapper>
                                    </TwoColumnWrapper>
                                </SpacingTopRegularWrapper>
                            })}
                        </LocalitiesWrapper>
                    </article>
                }
            </section>
        )
    }
};
