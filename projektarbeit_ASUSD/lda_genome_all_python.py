# ## Imports (Pandas, Numpy, Spacy, NLTK, Gensim) 

import pandas as pd
import numpy as np
import re
import spacy
spacy.load('en')
from spacy.lang.en import English

import nltk
nltk.download('wordnet')
from nltk.corpus import stopwords
en_stops = stopwords.words('english')

from nltk.corpus import wordnet as wn
from nltk.stem.wordnet import WordNetLemmatizer
import random
from gensim import corpora
import pickle
import gensim
import pyLDAvis.gensim
import ensembl_rest


# ## Create a dataframe object from given dataset 

#df = pd.read_csv('all_genes.txt', sep='\t', comment='#', low_memory=False, header=0)
#df = pd.read_csv('all_genes.txt')
df1 = pd.read_csv('all_genes.txt', error_bad_lines=False, sep='\t', comment='#', low_memory=False, header=0)
df1.head()


# ## Filter Dataframe for relevant data for LDA



df2 = pd.read_csv('all_genes.txt',
                         sep='\t', comment='#', low_memory=False,
                 usecols = ["other_designations","Symbol"],
                         header = 0 )
df2.head()
print(df2.values[0], df2.values[1], df2.values[2])
df2.describe()


# ## LDA (find 5 topics)

parser = English()

nltk.bigrams

# Divide data into atomic elements
def tokenize(text):
    lda_tokens = []
    tokens = parser(text)
    for token in tokens:
        if token.orth_.isspace():
            continue
        elif token.like_url:
            lda_tokens.append('URL')
        elif token.orth_.startswith('@'):
            lda_tokens.append('SCREEN_NAME')
        else:
            lda_tokens.append(token.lower_)
    return lda_tokens

# Lemmatize words 
def get_lemma(word):
    lemma = wn.morphy(word)
    if lemma is None:
        return word
    else:
        return lemma
    
def get_lemma2(word):
    return WordNetLemmatizer().lemmatize(word)

custom_stop = ['sapiens', 'protein', 'homo', '9606', 'single', 'minus', 'plus', 'homeobox', 'human', 'binding'
              'strand', 'nc_001460.1', 'receptor', 'factor', 'subunit', 'kinase', 'class', 'domain', 'homolog',
              'member', 'alpha', 'oncogene', 'transcription', 'helix']
en_stops.extend(custom_stop)


def prepare_text_for_lda(text):
    #text = text.split ('|')
    # remove all numbers
   # re.sub('A-Za-z', '0', text)
    re.sub('0-9', '', text)
    print(text)
    text = text.replace('|', ' ').split()
    return text

text_data = []
#with open('all_genes.txt') as f:
df2 = df2.dropna()
for line in df2.other_designations.values:
    print(line)
    tokens = prepare_text_for_lda(line)
    text_data.append(tokens)
   

 #text_data.append(df2[i])
  #  print(text_data)
   # tokens = prepare_text_for_lda(df[i])
    #if random.random() > .99:
     #   text_data.append(tokens)
            
# create a dictionary from the data
# convert it into a 'bag of words' corpus
dictionary = corpora.Dictionary(text_data)
corpus = [dictionary.doc2bow(text) for text in text_data]
pickle.dump(corpus, open('corpus.pkl', 'wb'))
dictionary.save('dictionary.gensim')

# define number of topics (here: 5)
NUM_TOPICS = 5
ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics = NUM_TOPICS, id2word=dictionary, passes=15)
ldamodel.save('model5.gensim')

topics = ldamodel.print_topics(num_words=4)
for topic in topics:
    print(topic)

text_data

# ## LDA with 3 topics 

ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics = 3, id2word=dictionary, passes=50, update_every = 3)
ldamodel.save('model3.gensim')
topics = ldamodel.print_topics(num_words=6)
for topic in topics:
    print(topic)

# ## LDA with 10 topics

ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics = 10, id2word=dictionary, passes=10, update_every = 3)
ldamodel.save('model10.gensim')
topics = ldamodel.print_topics(num_words=6)
for topic in topics:
    print(topic)

# ## Draw the distribution using pyLDAvis  

# 5 topics
dictionary = gensim.corpora.Dictionary.load('dictionary.gensim')
corpus = pickle.load(open('corpus.pkl', 'rb'))
lda = gensim.models.ldamodel.LdaModel.load('model5.gensim')

lda_display = pyLDAvis.gensim.prepare(lda, corpus, dictionary, sort_topics=False)
pyLDAvis.display(lda_display)

# 3 topics
lda3 = gensim.models.ldamodel.LdaModel.load('model3.gensim')
lda_display3 = pyLDAvis.gensim.prepare(lda3, corpus, dictionary, sort_topics=False)
pyLDAvis.display(lda_display3)

# 10 topics 
lda10 = gensim.models.ldamodel.LdaModel.load('model10.gensim')
lda_display10 = pyLDAvis.gensim.prepare(lda10, corpus, dictionary, sort_topics=False)
pyLDAvis.display(lda_display10)


#  ## Call Ensembl Genome REST API

#client = ensembl_rest.EnsemblClient()
#client.symbol_lookup('human', 'BRCA2', params={'expand':True})





